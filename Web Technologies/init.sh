#!/usr/bin/env bash
# init.sh - inisiasi backend Laravel (sekali jalan) untuk project di folder "Web Technologies"
#           (Arch Linux). Letakkan sejajar dengan dev.sh.
#
# Langkah yang dikerjakan (aman dijalankan berulang):
#   1. cek PHP >= 8.2, Composer, klien MariaDB, dan ekstensi PHP yang dibutuhkan Laravel
#   2. composer install (jika vendor belum ada)
#   3. buat .env dari .env.example + isi APP_KEY jika kosong
#   4. nyalakan MariaDB, buat database + user sesuai .env, impor db-dump.sql jika DB masih kosong
#   5. rapikan izin storage/ dan bootstrap/cache/, bersihkan cache Laravel
#   6. cek aplikasi bisa boot dan terhubung ke database
#
#   ./init.sh                     project saat ini (cd ke foldernya) / satu-satunya project
#   ./init.sh 0211                project tertentu
#   ./init.sh 0211 --fresh        hapus semua tabel lalu impor ulang dump (data uji kembali bersih)
#   ./init.sh 0211 --reinstall    paksa composer install walau vendor sudah ada
#   ./init.sh 0211 --apache       beri grup "http" pada storage/ dan bootstrap/cache/ (untuk Apache)
#   ./init.sh 0211 --no-db        lewati semua langkah database
#   ./init.sh 0211 --dump FILE    pakai file dump tertentu (default: db-dump.sql di folder project)
#   ./init.sh 0211 -y             jangan tanya konfirmasi
#
# Admin MariaDB untuk membuat database/user: dicoba `sudo mariadb`, lalu menanyakan
# user+password admin. Bisa juga lewat env DB_ADMIN_USER dan DB_ADMIN_PASS.

set -u

SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"
WEB_ROOT="${WEB_ROOT:-$(dirname "$SCRIPT_PATH")}"
DB_SERVICE="${DB_SERVICE:-mariadb}"
PHP_BIN="${PHP_BIN:-php}"
COMPOSER_BIN="${COMPOSER_BIN:-composer}"

if [[ -t 1 ]]; then
  C_OK=$'\e[32m'; C_ERR=$'\e[31m'; C_WARN=$'\e[33m'; C_DIM=$'\e[2m'; C_OFF=$'\e[0m'
else
  C_OK=''; C_ERR=''; C_WARN=''; C_DIM=''; C_OFF=''
fi
ok()   { echo "${C_OK}[ok]${C_OFF}   $*"; }
err()  { echo "${C_ERR}[err]${C_OFF}  $*" >&2; }
warn() { echo "${C_WARN}[warn]${C_OFF} $*"; }
info() { echo "${C_DIM}[..]${C_OFF}   $*"; }
step() { echo; echo "== $* =="; }

SUDO=""
[[ $EUID -ne 0 ]] && SUDO="sudo"

# ---------- argumen ----------
PROJECT=""; FRESH=0; REINSTALL=0; APACHE=0; NO_DB=0; ASSUME_YES=0; DUMP_ARG=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --fresh) FRESH=1 ;;
    --reinstall) REINSTALL=1 ;;
    --apache) APACHE=1 ;;
    --no-db) NO_DB=1 ;;
    -y|--yes) ASSUME_YES=1 ;;
    --dump)
      if [[ $# -lt 2 ]]; then err "--dump butuh path file"; exit 1; fi
      DUMP_ARG="$2"; shift ;;
    --dump=*) DUMP_ARG="${1#--dump=}" ;;
    -h|--help|help) sed -n '2,/^[^#]/{/^#/p}' "$SCRIPT_PATH" | sed 's/^# \{0,1\}//'; exit 0 ;;
    -*) err "Opsi tidak dikenal: $1"; exit 1 ;;
    *) if [[ -n "$PROJECT" ]]; then err "Hanya boleh satu project (sudah ada: $PROJECT)"; exit 1; fi
       PROJECT="$1" ;;
  esac
  shift
done

# ---------- deteksi project ----------
laravel_dir() {
  local p="$WEB_ROOT/$1"
  [[ -n "$1" ]] || return 1
  if [[ -f "$p/BACKEND/artisan" ]]; then echo "$p/BACKEND"
  elif [[ -f "$p/artisan" ]]; then echo "$p"
  else return 1; fi
}

list_projects() {
  local d name
  for d in "$WEB_ROOT"/*/; do
    name="$(basename "$d")"
    laravel_dir "$name" >/dev/null && echo "$name"
  done
}

detect_project() {
  local rel="$PWD/" ps=()
  rel="${rel#"$WEB_ROOT"/}"
  if [[ "$rel" != "$PWD/" ]]; then
    rel="${rel%%/*}"
    if laravel_dir "$rel" >/dev/null; then echo "$rel"; return 0; fi
  fi
  mapfile -t ps < <(list_projects)
  if [[ ${#ps[@]} -eq 1 ]]; then echo "${ps[0]}"; return 0; fi
  return 1
}

if [[ -z "$PROJECT" ]]; then
  if ! PROJECT="$(detect_project)"; then
    err "Project belum ditentukan. Pilih salah satu atau cd ke foldernya:"
    list_projects | sed 's/^/        - /' >&2
    exit 1
  fi
fi
DIR="$(laravel_dir "$PROJECT")" || { err "Project '$PROJECT' tidak ditemukan di $WEB_ROOT (butuh BACKEND/artisan)"; exit 1; }
PROJ_ROOT="$WEB_ROOT/$PROJECT"

echo "Project : $PROJECT"
echo "Backend : $DIR"

# ---------- util .env ----------
env_get() { # KEY [default]
  local v=""
  if [[ -f "$DIR/.env" ]]; then
    v="$(grep -E "^$1=" "$DIR/.env" | head -1 | cut -d= -f2- | tr -d '\r' | sed -e "s/^[\"']//" -e "s/[\"']$//")"
  fi
  echo "${v:-${2:-}}"
}

# ---------- 1. prasyarat ----------
step "1/6 Cek prasyarat"
FAIL=0

if ! command -v "$PHP_BIN" >/dev/null; then
  err "php tidak ditemukan.  sudo pacman -S php"; exit 1
fi
if "$PHP_BIN" -r 'exit(PHP_VERSION_ID >= 80200 ? 0 : 1);'; then
  ok "PHP $("$PHP_BIN" -r 'echo PHP_VERSION;')"
else
  err "PHP minimal 8.2 (terpasang: $("$PHP_BIN" -r 'echo PHP_VERSION;'))"; FAIL=1
fi

if command -v "$COMPOSER_BIN" >/dev/null; then ok "Composer ada"; else err "composer tidak ditemukan.  sudo pacman -S composer"; FAIL=1; fi

MYSQL_BIN="$(command -v mariadb || command -v mysql || true)"
if [[ -n "$MYSQL_BIN" ]]; then ok "Klien database: $(basename "$MYSQL_BIN")"; else err "Klien MariaDB tidak ada.  sudo pacman -S mariadb"; FAIL=1; fi

MISSING=()
LOADED="$("$PHP_BIN" -m 2>/dev/null | tr '[:upper:]' '[:lower:]')"
for ext in ctype curl dom fileinfo mbstring openssl pdo_mysql tokenizer xml; do
  grep -qx "$ext" <<<"$LOADED" || MISSING+=("$ext")
done
if [[ ${#MISSING[@]} -eq 0 ]]; then
  ok "Ekstensi PHP lengkap"
else
  INI="$("$PHP_BIN" --ini 2>/dev/null | sed -n 's/^Loaded Configuration File: *//p')"
  err "Ekstensi PHP belum aktif: ${MISSING[*]}"
  err "Hapus tanda ';' di depan baris extension=<nama> pada ${INI:-/etc/php/php.ini}"
  FAIL=1
fi
if [[ $FAIL -ne 0 ]]; then err "Perbaiki prasyarat di atas lalu jalankan ulang."; exit 1; fi

# ---------- 2. composer ----------
step "2/6 Dependency (composer)"
if [[ -d "$DIR/vendor" && -f "$DIR/vendor/autoload.php" && $REINSTALL -eq 0 ]]; then
  ok "vendor sudah ada (pakai --reinstall untuk memasang ulang)"
else
  info "composer install ..."
  if (cd "$DIR" && "$COMPOSER_BIN" install --no-interaction --prefer-dist); then
    ok "Dependency terpasang"
  else
    err "composer install gagal. Perbaiki error di atas lalu jalankan ulang."; exit 1
  fi
fi

# ---------- 3. .env + APP_KEY ----------
step "3/6 File .env dan APP_KEY"
if [[ -f "$DIR/.env" ]]; then
  ok ".env sudah ada"
elif [[ -f "$DIR/.env.example" ]]; then
  cp "$DIR/.env.example" "$DIR/.env" && ok ".env dibuat dari .env.example"
else
  err "Tidak ada .env maupun .env.example di $DIR"; exit 1
fi

if [[ -z "$(env_get APP_KEY)" ]]; then
  info "APP_KEY kosong, membuat key baru ..."
  if (cd "$DIR" && "$PHP_BIN" artisan key:generate --force >/dev/null); then ok "APP_KEY dibuat"; else err "key:generate gagal"; exit 1; fi
else
  ok "APP_KEY sudah terisi"
fi

# ---------- 4. database ----------
DB_OK=0
db_client() { # argumen tambahan ke klien, memakai kredensial .env
  MYSQL_PWD="$DB_PASS" "$MYSQL_BIN" --skip-ssl -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$@"
}

admin_client() { # klien dengan hak admin; isi ADMIN_MODE saat berhasil
  case "$ADMIN_MODE" in
    sudo)  $SUDO "$MYSQL_BIN" --skip-ssl "$@" ;;
    creds) MYSQL_PWD="$ADMIN_PASS" "$MYSQL_BIN" --skip-ssl -h "$DB_HOST" -P "$DB_PORT" -u "$ADMIN_USER" "$@" ;;
  esac
}

find_admin() {
  ADMIN_MODE=""; ADMIN_USER="${DB_ADMIN_USER:-}"; ADMIN_PASS="${DB_ADMIN_PASS:-}"
  if [[ -n "$ADMIN_USER" ]]; then
    ADMIN_MODE="creds"; admin_client -e "SELECT 1" >/dev/null 2>&1 && return 0
    ADMIN_MODE=""; err "Kredensial DB_ADMIN_USER/DB_ADMIN_PASS ditolak"; return 1
  fi
  ADMIN_MODE="sudo"
  if admin_client -e "SELECT 1" >/dev/null 2>&1; then return 0; fi
  ADMIN_MODE=""
  if [[ -t 0 ]]; then
    read -r -p "User admin MariaDB [root]: " ADMIN_USER; ADMIN_USER="${ADMIN_USER:-root}"
    read -r -s -p "Password $ADMIN_USER (kosongkan jika tidak ada): " ADMIN_PASS; echo
    ADMIN_MODE="creds"
    if admin_client -e "SELECT 1" >/dev/null 2>&1; then return 0; fi
    ADMIN_MODE=""
  fi
  return 1
}

manual_sql_hint() {
  warn "Buat manual lalu jalankan ulang script ini:"
  echo "    sudo mariadb -e \"CREATE DATABASE IF NOT EXISTS \\\`$DB_NAME\\\`; CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '<password>'; CREATE USER IF NOT EXISTS '$DB_USER'@'127.0.0.1' IDENTIFIED BY '<password>'; GRANT ALL ON \\\`$DB_NAME\\\`.* TO '$DB_USER'@'localhost'; GRANT ALL ON \\\`$DB_NAME\\\`.* TO '$DB_USER'@'127.0.0.1'; FLUSH PRIVILEGES;\""
}

find_dump() {
  local c f
  if [[ -n "$DUMP_ARG" ]]; then
    [[ -f "$DUMP_ARG" ]] && { echo "$DUMP_ARG"; return 0; }
    return 1
  fi
  for c in "$PROJ_ROOT/db-dump.sql" "$DIR/db-dump.sql"; do
    [[ -f "$c" ]] && { echo "$c"; return 0; }
  done
  mapfile -t f < <(find "$PROJ_ROOT" -maxdepth 1 -name '*.sql' ! -name 'dev-reset.sql' 2>/dev/null)
  if [[ ${#f[@]} -eq 1 ]]; then echo "${f[0]}"; return 0; fi
  return 1
}

table_count() {
  db_client -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='$DB_NAME'" 2>/dev/null
}

step "4/6 Database"
if [[ $NO_DB -eq 1 ]]; then
  info "Dilewati (--no-db)"
else
  DB_HOST="$(env_get DB_HOST 127.0.0.1)"; DB_PORT="$(env_get DB_PORT 3306)"
  DB_NAME="$(env_get DB_DATABASE)"; DB_USER="$(env_get DB_USERNAME root)"; DB_PASS="$(env_get DB_PASSWORD)"
  ADMIN_MODE=""; ADMIN_USER=""; ADMIN_PASS=""

  if [[ "$(env_get DB_CONNECTION)" != "mysql" && "$(env_get DB_CONNECTION)" != "mariadb" ]]; then
    warn "DB_CONNECTION bukan mysql/mariadb, langkah database dilewati"
  elif [[ -z "$DB_NAME" ]]; then
    err "DB_DATABASE kosong di .env"
  else
    db_port_open() { timeout 1 bash -c "exec 3<>/dev/tcp/$DB_HOST/$DB_PORT" 2>/dev/null; }
    if ! db_port_open; then
      info "Menyalakan MariaDB ..."
      $SUDO systemctl start "$DB_SERVICE" || err "Gagal start $DB_SERVICE (cek: journalctl -xeu $DB_SERVICE)"
      for _ in $(seq 1 20); do db_port_open && break; sleep 1; done
    fi

    if ! db_port_open; then
      err "MariaDB tidak merespons di $DB_HOST:$DB_PORT"
    elif db_client "$DB_NAME" -e "SELECT 1" >/dev/null 2>&1; then
      ok "MariaDB jalan. Login '$DB_USER' ke database '$DB_NAME' berhasil"
      DB_OK=1
    else
      info "Login dengan kredensial .env gagal. Mencoba membuat database dan user ..."
      if [[ "$DB_PASS" == *"'"* || "$DB_PASS" == *"\\"* ]]; then
        err "Password di .env mengandung ' atau \\, tidak bisa dibuat otomatis"; manual_sql_hint
      elif find_admin; then
        SQL="CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
        if [[ "$DB_USER" != "root" ]]; then
          SQL+=" CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
          SQL+=" CREATE USER IF NOT EXISTS '$DB_USER'@'127.0.0.1' IDENTIFIED BY '$DB_PASS';"
          SQL+=" ALTER USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS'; ALTER USER '$DB_USER'@'127.0.0.1' IDENTIFIED BY '$DB_PASS';"
          SQL+=" GRANT ALL ON \`$DB_NAME\`.* TO '$DB_USER'@'localhost'; GRANT ALL ON \`$DB_NAME\`.* TO '$DB_USER'@'127.0.0.1';"
        fi
        SQL+=" FLUSH PRIVILEGES;"
        if admin_client -e "$SQL" && db_client "$DB_NAME" -e "SELECT 1" >/dev/null 2>&1; then
          ok "Database '$DB_NAME' dan user '$DB_USER' siap"; DB_OK=1
        else
          err "Gagal menyiapkan database/user"
          if [[ "$DB_USER" == "root" ]]; then
            warn "MariaDB di Arch biasanya menolak login root lewat TCP tanpa password."
            warn "Pakai user non-root: ubah DB_USERNAME/DB_PASSWORD di .env (mis. laravel / laravel), lalu jalankan ulang."
          else
            manual_sql_hint
          fi
        fi
      else
        err "Tidak bisa masuk sebagai admin MariaDB"; manual_sql_hint
      fi
    fi

    if [[ $DB_OK -eq 1 ]]; then
      DUMP="$(find_dump || true)"
      TABLES="$(table_count || echo 0)"
      if [[ $FRESH -eq 1 ]]; then
        if [[ -z "$DUMP" ]]; then
          err "--fresh butuh file dump (db-dump.sql). Tidak ditemukan."
        else
          if [[ $ASSUME_YES -eq 0 ]]; then
            read -r -p "SEMUA tabel di '$DB_NAME' akan dihapus lalu diimpor ulang dari $(basename "$DUMP"). Lanjut? [y/N] " ans
            [[ "$ans" =~ ^[Yy]$ ]] || { info "Dibatalkan"; DUMP=""; FRESH=0; }
          fi
          if [[ -n "$DUMP" ]]; then
            info "Menghapus semua tabel di '$DB_NAME' ..."
            mapfile -t TBL < <(db_client -N -e "SELECT table_name FROM information_schema.tables WHERE table_schema='$DB_NAME'")
            {
              echo "SET FOREIGN_KEY_CHECKS=0;"
              for t in "${TBL[@]}"; do echo "DROP TABLE IF EXISTS \`$t\`;"; done
              echo "SET FOREIGN_KEY_CHECKS=1;"
            } | db_client "$DB_NAME" && TABLES=0
          fi
        fi
      fi

      if [[ "${TABLES:-0}" -eq 0 && -n "${DUMP:-}" ]]; then
        USE_DB="$(grep -m1 -oE '^USE `[^`]+`' "$DUMP" | sed -E 's/USE `(.*)`/\1/')"
        if [[ -n "$USE_DB" && "$USE_DB" != "$DB_NAME" ]]; then
          warn "Dump memakai database '$USE_DB' tetapi .env memakai '$DB_NAME'"
        fi
        info "Mengimpor $(basename "$DUMP") ..."
        if db_client "$DB_NAME" <"$DUMP"; then ok "Dump terimpor: $(table_count) tabel"; else err "Impor dump gagal"; fi
      elif [[ "${TABLES:-0}" -gt 0 ]]; then
        ok "Database sudah berisi $TABLES tabel, impor dilewati (pakai --fresh untuk impor ulang)"
      else
        warn "Database kosong dan tidak ada file dump. Taruh db-dump.sql di $PROJ_ROOT atau pakai --dump FILE"
      fi
    fi
  fi
fi

# ---------- 5. izin folder + cache ----------
step "5/6 Izin folder dan cache"
mkdir -p "$DIR/storage/logs" "$DIR/storage/framework/cache/data" "$DIR/storage/framework/sessions" \
         "$DIR/storage/framework/views" "$DIR/bootstrap/cache"
chmod -R u+rwX "$DIR/storage" "$DIR/bootstrap/cache"
ok "storage/ dan bootstrap/cache/ bisa ditulis oleh user ini"
if [[ $APACHE -eq 1 ]]; then
  if getent group http >/dev/null; then
    $SUDO chgrp -R http "$DIR/storage" "$DIR/bootstrap/cache" \
      && chmod -R g+rwX "$DIR/storage" "$DIR/bootstrap/cache" \
      && ok "Grup 'http' diberi akses tulis (Apache)" || err "Gagal mengatur grup http"
  else
    warn "Grup 'http' tidak ada (Apache belum terpasang?)"
  fi
fi
if (cd "$DIR" && "$PHP_BIN" artisan optimize:clear >/dev/null 2>&1); then ok "Cache Laravel dibersihkan"; else warn "optimize:clear gagal (tidak fatal)"; fi

# ---------- 6. verifikasi ----------
step "6/6 Verifikasi"
if (cd "$DIR" && "$PHP_BIN" artisan route:list >/dev/null 2>&1); then
  ok "Aplikasi bisa boot dan route terbaca"
else
  err "Aplikasi gagal boot. Lihat detailnya: (cd \"$DIR\" && php artisan route:list)"
fi
if [[ $NO_DB -eq 0 && $DB_OK -eq 1 ]]; then
  if (cd "$DIR" && "$PHP_BIN" artisan tinker --execute="echo DB::select('select 1 as ok')[0]->ok;" 2>/dev/null | grep -q 1); then
    ok "Laravel terhubung ke database"
  else
    warn "Cek koneksi database lewat Laravel gagal, periksa DB_* di .env"
  fi
fi

echo
echo "Selesai. Jalankan backend:  ./dev.sh start $PROJECT"
