#!/usr/bin/env bash
# dev.sh - start/stop service untuk SEMUA project Laravel di folder "Web Technologies"
#          (Arch Linux + systemd). Letakkan file ini di folder "Web Technologies".
#
# Project = subfolder yang punya BACKEND/artisan (atau artisan langsung di dalamnya).
# Nama project = nama foldernya, mis. 0211
#
#   ./dev.sh list                   daftar project yang terdeteksi
#   ./dev.sh start                  MariaDB + Laravel (artisan serve) project saat ini
#   ./dev.sh start 0211             project tertentu (boleh beberapa: start 0211 0302)
#   ./dev.sh start all 0211         MariaDB + Apache + Laravel
#   ./dev.sh start web | db | api   pilih sendiri: db | web | api | all
#   ./dev.sh start 0211 --port 8001 paksa port (default: 8000, lalu 8001, ...)
#   ./dev.sh stop                   matikan SEMUA (Laravel semua project, Apache, MariaDB)
#   ./dev.sh stop api 0211          matikan Laravel project 0211 saja
#   ./dev.sh restart [...]          stop lalu start
#   ./dev.sh status                 status service + RAM
#   ./dev.sh logs [0211]            ikuti log Laravel project
#   ./dev.sh reset [0211]           jalankan <project>/dev-reset.sql (kosongkan data uji)
#
# "Project saat ini" = project tempat terminal berada (cd ke foldernya dulu),
# atau satu-satunya project jika hanya ada satu.

set -u

SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"
WEB_ROOT="${WEB_ROOT:-$(dirname "$SCRIPT_PATH")}"
STATE_DIR="${STATE_DIR:-${XDG_STATE_HOME:-$HOME/.local/state}/webtech-dev}"
API_HOST="${API_HOST:-127.0.0.1}"
API_PORT_START="${API_PORT_START:-8000}"
DB_SERVICE="${DB_SERVICE:-mariadb}"
WEB_SERVICE="${WEB_SERVICE:-httpd}"
DB_WAIT_PORT="${DB_WAIT_PORT:-3306}"
PHP_BIN="${PHP_BIN:-php}"

if [[ -t 1 ]]; then
  C_OK=$'\e[32m'; C_ERR=$'\e[31m'; C_WARN=$'\e[33m'; C_DIM=$'\e[2m'; C_OFF=$'\e[0m'
else
  C_OK=''; C_ERR=''; C_WARN=''; C_DIM=''; C_OFF=''
fi
ok()   { echo "${C_OK}[ok]${C_OFF}   $*"; }
err()  { echo "${C_ERR}[err]${C_OFF}  $*" >&2; }
warn() { echo "${C_WARN}[warn]${C_OFF} $*"; }
info() { echo "${C_DIM}[..]${C_OFF}   $*"; }

SUDO=""
[[ $EUID -ne 0 ]] && SUDO="sudo"

# ---------- util ----------
port_open() { timeout 1 bash -c "exec 3<>/dev/tcp/$1/$2" 2>/dev/null; }

wait_port() { # host port detik
  local i
  for ((i = 0; i < $3; i++)); do
    port_open "$1" "$2" && return 0
    sleep 1
  done
  return 1
}

svc_active() { systemctl is-active --quiet "$1"; }

env_get() { # dir KEY [default]  -> nilai dari <dir>/.env
  local v=""
  if [[ -f "$1/.env" ]]; then
    v="$(grep -E "^$2=" "$1/.env" | head -1 | cut -d= -f2- | tr -d '\r' | sed -e "s/^[\"']//" -e "s/[\"']$//")"
  fi
  echo "${v:-${3:-}}"
}

# ---------- deteksi project ----------
laravel_dir() { # nama -> folder yang berisi artisan
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

detect_project() { # nama project dari folder aktif, atau satu-satunya project
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

pick_projects() { # isi RESOLVED dari PROJECTS atau deteksi otomatis
  RESOLVED=()
  local n
  if [[ ${#PROJECTS[@]} -gt 0 ]]; then
    for n in "${PROJECTS[@]}"; do
      if laravel_dir "$n" >/dev/null; then RESOLVED+=("$n")
      else err "Project '$n' tidak ditemukan di $WEB_ROOT (butuh BACKEND/artisan)"; return 1; fi
    done
    return 0
  fi
  if n="$(detect_project)"; then RESOLVED+=("$n"); return 0; fi
  err "Project belum ditentukan. Pilih salah satu atau cd ke foldernya:"
  list_projects | sed 's/^/        - /' >&2
  return 1
}

# ---------- MariaDB ----------
db_start() {
  if svc_active "$DB_SERVICE"; then ok "MariaDB sudah jalan"; return 0; fi
  info "Menyalakan MariaDB..."
  $SUDO systemctl start "$DB_SERVICE" || { err "Gagal start $DB_SERVICE"; return 1; }
  if wait_port 127.0.0.1 "$DB_WAIT_PORT" 20; then ok "MariaDB jalan"; else warn "MariaDB aktif tapi port $DB_WAIT_PORT belum terbuka"; fi
}

db_stop() {
  if ! svc_active "$DB_SERVICE"; then ok "MariaDB sudah mati"; return 0; fi
  info "Mematikan MariaDB..."
  $SUDO systemctl stop "$DB_SERVICE" && ok "MariaDB mati" || err "Gagal stop $DB_SERVICE"
}

# ---------- Apache ----------
web_start() {
  if svc_active "$WEB_SERVICE"; then ok "Apache sudah jalan"; return 0; fi
  info "Menyalakan Apache..."
  $SUDO systemctl start "$WEB_SERVICE" || { err "Gagal start $WEB_SERVICE (cek: journalctl -xeu $WEB_SERVICE)"; return 1; }
  ok "Apache jalan (http://localhost)"
}

web_stop() {
  if ! svc_active "$WEB_SERVICE"; then ok "Apache sudah mati"; return 0; fi
  info "Mematikan Apache..."
  $SUDO systemctl stop "$WEB_SERVICE" && ok "Apache mati" || err "Gagal stop $WEB_SERVICE"
}

# ---------- Laravel (php artisan serve), satu proses per project ----------
pid_file() { echo "$STATE_DIR/$1.pid"; }
log_file() { echo "$STATE_DIR/$1.log"; }
port_file() { echo "$STATE_DIR/$1.port"; }

api_running() { # nama
  local pid
  [[ -f "$(pid_file "$1")" ]] || return 1
  pid="$(cat "$(pid_file "$1")")"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

api_port() { cat "$(port_file "$1")" 2>/dev/null; }

pick_port() { # nama -> port bebas (utamakan port lama project ini agar base_url Postman stabil)
  local p old
  old="$(api_port "$1")"
  if [[ -n "$old" ]] && ! port_open "$API_HOST" "$old"; then echo "$old"; return 0; fi
  for ((p = API_PORT_START; p < API_PORT_START + 100; p++)); do
    port_open "$API_HOST" "$p" || { echo "$p"; return 0; }
  done
  return 1
}

api_start() { # nama
  local name="$1" dir port
  dir="$(laravel_dir "$name")" || { err "Project '$name' tidak ditemukan"; return 1; }
  if [[ ! -d "$dir/vendor" ]]; then
    err "[$name] vendor belum ada. Jalankan dulu: (cd \"$dir\" && composer install)"; return 1
  fi
  if api_running "$name"; then ok "[$name] sudah jalan: http://$API_HOST:$(api_port "$name")"; return 0; fi

  if [[ -n "$FORCE_PORT" ]]; then
    port="$FORCE_PORT"
    if port_open "$API_HOST" "$port"; then err "[$name] port $port sudah dipakai proses lain"; return 1; fi
  else
    port="$(pick_port "$name")" || { err "[$name] tidak ada port bebas mulai dari $API_PORT_START"; return 1; }
  fi

  mkdir -p "$STATE_DIR"
  info "[$name] Menyalakan Laravel di http://$API_HOST:$port ..."
  (
    cd "$dir" || exit 1
    setsid nohup "$PHP_BIN" artisan serve --host="$API_HOST" --port="$port" >"$(log_file "$name")" 2>&1 &
    echo $! >"$(pid_file "$name")"
  )
  echo "$port" >"$(port_file "$name")"

  if wait_port "$API_HOST" "$port" 15; then
    ok "[$name] Laravel jalan: http://$API_HOST:$port"
  else
    err "[$name] Laravel tidak merespons. Isi log terakhir:"
    tail -n 15 "$(log_file "$name")" 2>/dev/null
    api_stop "$name" >/dev/null 2>&1
    return 1
  fi
}

api_stop() { # nama
  local name="$1" pid i port
  if ! api_running "$name"; then
    rm -f "$(pid_file "$name")"
    port="$(api_port "$name")"
    if [[ -n "$port" ]] && port_open "$API_HOST" "$port"; then
      warn "[$name] port $port masih terbuka tapi bukan dari script ini (hentikan dengan Ctrl+C di terminal asalnya)"
    else
      ok "[$name] Laravel sudah mati"
    fi
    return 0
  fi

  pid="$(cat "$(pid_file "$name")")"
  info "[$name] Mematikan Laravel (PID $pid)..."
  kill -TERM -- "-$pid" 2>/dev/null || kill -TERM "$pid" 2>/dev/null
  for ((i = 0; i < 10; i++)); do
    kill -0 "$pid" 2>/dev/null || break
    sleep 0.5
  done
  if kill -0 "$pid" 2>/dev/null; then
    kill -KILL -- "-$pid" 2>/dev/null || kill -KILL "$pid" 2>/dev/null
  fi
  rm -f "$(pid_file "$name")"
  ok "[$name] Laravel mati"
}

api_stop_all_running() {
  local n found=0
  for n in $(list_projects); do
    if [[ -f "$(pid_file "$n")" ]]; then api_stop "$n"; found=1; fi
  done
  [[ $found -eq 0 ]] && ok "Tidak ada Laravel yang dijalankan script ini"
  return 0
}

# ---------- status / list ----------
state_label() { if "$@"; then echo "${C_OK}JALAN${C_OFF}"; else echo "${C_ERR}mati${C_OFF}"; fi; }

ram_of() { # nama proses (ps -C) -> MB
  ps -C "$1" -o rss= 2>/dev/null | awk '{s+=$1} END {printf "%.0f", s/1024}'
}

status() {
  local n port
  printf "%-14s %-16s %s\n" "MariaDB" "$(state_label svc_active "$DB_SERVICE")" "RAM $(ram_of mariadbd) MB"
  printf "%-14s %-16s %s\n" "Apache" "$(state_label svc_active "$WEB_SERVICE")" "RAM $(ram_of httpd) MB"
  for n in $(list_projects); do
    port="$(api_port "$n")"
    if api_running "$n"; then
      printf "%-14s %-16s %s\n" "Laravel $n" "$(state_label api_running "$n")" "http://$API_HOST:$port"
    else
      printf "%-14s %-16s\n" "Laravel $n" "$(state_label api_running "$n")"
    fi
  done
  echo "${C_DIM}RAM semua proses php: $(ram_of php) MB${C_OFF}"
}

list_cmd() {
  local n d v
  echo "Folder: $WEB_ROOT"
  for n in $(list_projects); do
    d="$(laravel_dir "$n")"
    if [[ -d "$d/vendor" ]]; then v="siap"; else v="vendor belum ada (composer install)"; fi
    printf "  %-12s %-34s %s\n" "$n" "${d#"$WEB_ROOT"/}" "$v"
  done
}

# ---------- reset data uji ----------
reset_data() {
  local n dir sql="" s bin h p u pw d
  pick_projects || return 1
  if [[ ${#RESOLVED[@]} -ne 1 ]]; then err "reset hanya untuk satu project"; return 1; fi
  n="${RESOLVED[0]}"; dir="$(laravel_dir "$n")"
  for s in "$WEB_ROOT/$n/dev-reset.sql" "$dir/dev-reset.sql"; do
    if [[ -f "$s" ]]; then sql="$s"; break; fi
  done
  if [[ -z "$sql" ]]; then err "[$n] tidak ada dev-reset.sql (taruh di $WEB_ROOT/$n/)"; return 1; fi
  bin="$(command -v mariadb || command -v mysql)" || { err "Klien mariadb/mysql tidak ditemukan"; return 1; }
  if ! svc_active "$DB_SERVICE"; then err "MariaDB belum jalan. Jalankan: ./dev.sh start db"; return 1; fi

  h="$(env_get "$dir" DB_HOST 127.0.0.1)"; p="$(env_get "$dir" DB_PORT 3306)"
  u="$(env_get "$dir" DB_USERNAME root)"; pw="$(env_get "$dir" DB_PASSWORD)"; d="$(env_get "$dir" DB_DATABASE)"
  if [[ -z "$d" ]]; then err "[$n] DB_DATABASE kosong di .env"; return 1; fi

  info "[$n] Menjalankan $(basename "$sql") di database '$d'..."
  MYSQL_PWD="$pw" "$bin" --skip-ssl -h "$h" -P "$p" -u "$u" "$d" <"$sql" \
    && ok "[$n] Data uji direset." \
    || err "[$n] Gagal. Cek kredensial DB_* di .env"
}

logs_cmd() {
  local n dir files=()
  pick_projects || return 1
  n="${RESOLVED[0]}"; dir="$(laravel_dir "$n")"
  [[ -f "$(log_file "$n")" ]] && files+=("$(log_file "$n")")
  [[ -f "$dir/storage/logs/laravel.log" ]] && files+=("$dir/storage/logs/laravel.log")
  if [[ ${#files[@]} -eq 0 ]]; then warn "[$n] Belum ada log."; return 0; fi
  tail -n 30 -F "${files[@]}"
}

# ---------- dispatcher ----------
usage() { sed -n '2,/^[^#]/{/^#/p}' "$SCRIPT_PATH" | sed 's/^# \{0,1\}//'; }

expand_targets() { # default [arg...] -> daftar target unik
  local default="$1"; shift
  local t out=()
  if [[ $# -eq 0 ]]; then set -- $default; fi
  for t in "$@"; do
    case "$t" in
      all)              out+=(db web api) ;;
      db|mariadb|mysql) out+=(db) ;;
      web|apache)       out+=(web) ;;
      api|laravel)      out+=(api) ;;
    esac
  done
  echo "${out[@]}"
}

has_target() { [[ " $1 " == *" $2 "* ]]; }

do_start() {
  local targets n
  targets="$(expand_targets "db api" "${TARGETS[@]}")"
  if has_target "$targets" api; then pick_projects || return 1; fi
  if has_target "$targets" db;  then db_start; fi
  if has_target "$targets" web; then web_start; fi
  if has_target "$targets" api; then
    for n in "${RESOLVED[@]}"; do api_start "$n"; done
  fi
}

do_stop() {
  local targets n
  targets="$(expand_targets "api web db" "${TARGETS[@]}")"
  if has_target "$targets" api; then
    if [[ ${#PROJECTS[@]} -gt 0 ]]; then
      pick_projects || return 1
      for n in "${RESOLVED[@]}"; do api_stop "$n"; done
    else
      api_stop_all_running
    fi
  fi
  if has_target "$targets" web; then web_stop; fi
  if has_target "$targets" db;  then db_stop; fi
}

cmd="${1:-help}"; shift || true

TARGETS=(); PROJECTS=(); FORCE_PORT=""; RESOLVED=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    all|db|mariadb|mysql|web|apache|api|laravel) TARGETS+=("$1") ;;
    --port|-p)
      if [[ $# -lt 2 ]]; then err "--port butuh angka"; exit 1; fi
      FORCE_PORT="$2"; shift ;;
    --port=*) FORCE_PORT="${1#--port=}" ;;
    *) PROJECTS+=("$1") ;;
  esac
  shift
done
if [[ -n "$FORCE_PORT" && ! "$FORCE_PORT" =~ ^[0-9]+$ ]]; then err "Port harus angka"; exit 1; fi
if [[ -n "$FORCE_PORT" && ${#PROJECTS[@]} -gt 1 ]]; then err "--port hanya untuk satu project"; exit 1; fi

case "$cmd" in
  start)   do_start ;;
  stop)    do_stop ;;
  restart) do_stop; do_start ;;
  status)  status ;;
  list)    list_cmd ;;
  logs)    logs_cmd ;;
  reset)   reset_data ;;
  help|-h|--help) usage ;;
  *) err "Perintah tidak dikenal: $cmd"; usage; exit 1 ;;
esac
