#!/usr/bin/env python3
"""
LKS Reset - kembalikan database uji ke kondisi awal untuk project LKS apa pun.

Cara kerja: DROP DATABASE -> CREATE DATABASE -> import ulang file dump dari mentor.
Nama database dideteksi otomatis dari isi dump (CREATE DATABASE / USE / "-- Database:"),
jadi tool yang sama bisa dipakai untuk semua soal.

  GUI : python lks_reset.py                (butuh PyQt6)
  CLI : python lks_reset.py dump.sql --yes
        python lks_reset.py dump.sql --tokens-only
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import time
from dataclasses import dataclass
from pathlib import Path

CLIENT = shutil.which("mariadb") or shutil.which("mysql")
DUMPER = shutil.which("mariadb-dump") or shutil.which("mysqldump")

CONFIG_PATH = Path.home() / ".config" / "lks_reset.json"
BACKUP_DIR = Path.home() / "lks_backups"
KEEP_BACKUPS = 10

DB_NAME_RE = re.compile(r"[A-Za-z0-9_\-]{1,64}")

DETECT_PATTERNS = [
    re.compile(r"CREATE\s+DATABASE\s+(?:IF\s+NOT\s+EXISTS\s+)?`([^`]+)`", re.I),
    re.compile(r"^\s*USE\s+`([^`]+)`", re.I | re.M),
    re.compile(r"^--\s*Database:\s*`?([^`\s]+)`?", re.I | re.M),
]

# Baris yang dibuang saat import supaya dump tidak pindah ke database lain
SKIP_LINE = re.compile(
    rb"^\s*(CREATE\s+DATABASE\b[^\n]*;|DROP\s+DATABASE\b[^\n]*;|USE\s+[`\w\-]+\s*;)\s*$",
    re.I,
)


class ToolError(Exception):
    pass


@dataclass
class Conn:
    host: str = "127.0.0.1"
    port: int = 3306
    user: str = "lks"
    password: str = "lks123"
    sudo: bool = False  # login root lewat socket (hanya cocok untuk CLI)


# ---------------------------------------------------------------- inti

def valid_db(name: str) -> str:
    if not DB_NAME_RE.fullmatch(name or ""):
        raise ToolError(f"Nama database tidak valid: {name!r} (hanya huruf, angka, _ dan -)")
    return name


def detect_db(dump_path) -> str:
    """Tebak nama database dari isi dump; cadangan: nama file."""
    path = Path(dump_path)
    with open(path, "rb") as f:
        head = f.read(1024 * 1024).decode("utf-8", errors="replace")
    for pattern in DETECT_PATTERNS:
        m = pattern.search(head)
        if m and DB_NAME_RE.fullmatch(m.group(1)):
            return m.group(1)
    stem = re.sub(r"[^A-Za-z0-9_\-]+", "_", path.stem).strip("_")
    return stem[:64] or "lks_db"


def _env(c: Conn):
    env = dict(os.environ)
    if not c.sudo and c.password:
        env["MYSQL_PWD"] = c.password
    return env


def _cmd(binary, c: Conn, extra=(), db=None):
    cmd = (["sudo"] if c.sudo else []) + [binary]
    if not c.sudo:
        cmd += ["-h", c.host, "-P", str(c.port), "-u", c.user]
    cmd += list(extra)
    if db:
        cmd.append(db)
    return cmd


def _friendly(err: str) -> str:
    err = err.strip()
    if "Access denied" in err or "ERROR 1698" in err or "ERROR 1045" in err:
        return (err + "\n\nAkses ditolak. Cek user/password, atau beri akses sekali (lokal saja):\n"
                "  sudo mariadb -e \"GRANT ALL PRIVILEGES ON *.* TO 'lks'@'localhost'; FLUSH PRIVILEGES;\"")
    if "Can't connect" in err or "ERROR 2002" in err or "ERROR 2003" in err:
        return err + "\n\nServer MariaDB tidak terjangkau. Nyalakan dulu: sudo systemctl start mariadb"
    return err


def sql(c: Conn, statement: str, db=None, rows=False) -> str:
    if not CLIENT:
        raise ToolError("Klien MariaDB/MySQL tidak ditemukan (Arch: sudo pacman -S mariadb-clients).")
    extra = ["-N", "-B"] if rows else []
    extra += ["-e", statement]
    r = subprocess.run(_cmd(CLIENT, c, extra, db), env=_env(c), capture_output=True, text=True)
    if r.returncode != 0:
        raise ToolError(_friendly(r.stderr or r.stdout))
    return r.stdout


def db_exists(c: Conn, db: str) -> bool:
    out = sql(c, f"SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME='{valid_db(db)}'", rows=True)
    return bool(out.strip())


def test_connection(c: Conn, log=print):
    out = sql(c, "SELECT CURRENT_USER(), VERSION()", rows=True).strip().split("\t")
    log(f"Terhubung sebagai {out[0]} (server {out[1]})")


def backup(c: Conn, db: str, log=print):
    if not DUMPER:
        log("Peringatan: mariadb-dump tidak ditemukan, backup dilewati.")
        return None
    if not db_exists(c, db):
        log("Database belum ada, tidak perlu backup.")
        return None
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    target = BACKUP_DIR / f"{db}_{time.strftime('%Y%m%d_%H%M%S')}.sql"
    with open(target, "wb") as f:
        r = subprocess.run(_cmd(DUMPER, c, ["--single-transaction", "--routines"], db),
                           env=_env(c), stdout=f, stderr=subprocess.PIPE)
    if r.returncode != 0:
        target.unlink(missing_ok=True)
        raise ToolError("Backup gagal: " + _friendly(r.stderr.decode(errors="replace")))
    old = sorted(BACKUP_DIR.glob(f"{db}_*.sql"))[:-KEEP_BACKUPS]
    for f in old:
        f.unlink(missing_ok=True)
    log(f"Backup tersimpan: {target}")
    return target


def import_dump(c: Conn, db: str, dump_path, log=print):
    cmd = _cmd(CLIENT, c, ["--default-character-set=utf8mb4"], db)
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE, env=_env(c))
    skipped = 0
    try:
        with open(dump_path, "rb") as f:
            for line in f:
                if SKIP_LINE.match(line):
                    skipped += 1
                    continue
                # dump MySQL 8 memakai collation yang tidak dikenal MariaDB
                line = line.replace(b"utf8mb4_0900_ai_ci", b"utf8mb4_unicode_ci")
                proc.stdin.write(line)
    except BrokenPipeError:
        pass
    finally:
        try:
            proc.stdin.close()
        except Exception:
            pass
    err = proc.stderr.read().decode(errors="replace")
    if proc.wait() != 0:
        raise ToolError("Import gagal:\n" + _friendly(err))
    if skipped:
        log(f"({skipped} baris CREATE/DROP/USE DATABASE di dump dilewati)")


def table_counts(c: Conn, db: str):
    tables = [t for t in sql(c, f"SHOW TABLES FROM `{valid_db(db)}`", rows=True).split("\n") if t.strip()]
    if not tables:
        return []
    parts = [f"SELECT '{t}', COUNT(*) FROM `{db}`.`{t}`" for t in tables[:60] if DB_NAME_RE.fullmatch(t)]
    out = sql(c, " UNION ALL ".join(parts), rows=True)
    return [tuple(line.split("\t")) for line in out.strip().split("\n") if line]


def reset_database(c: Conn, db: str, dump_path, do_backup=True, log=print):
    valid_db(db)
    if not Path(dump_path).is_file():
        raise ToolError(f"File dump tidak ditemukan: {dump_path}")
    log(f"== Reset `{db}` dari {Path(dump_path).name}")
    test_connection(c, log)
    if do_backup:
        backup(c, db, log)
    log("Menghapus dan membuat ulang database...")
    sql(c, f"DROP DATABASE IF EXISTS `{db}`; "
           f"CREATE DATABASE `{db}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
    log("Mengimpor dump...")
    import_dump(c, db, dump_path, log)
    counts = table_counts(c, db)
    log(f"Selesai: {len(counts)} tabel.")
    for name, n in counts:
        log(f"  {name}: {n} baris")


def clear_tokens(c: Conn, db: str, log=print):
    """Logout semua sesi: kosongkan token Sanctum dan kolom login_tokens (kalau ada)."""
    valid_db(db)
    log(f"== Hapus token login di `{db}`")
    test_connection(c, log)
    if not db_exists(c, db):
        raise ToolError(f"Database `{db}` belum ada.")
    done = False
    has_pat = sql(c, "SELECT TABLE_NAME FROM information_schema.TABLES "
                     f"WHERE TABLE_SCHEMA='{db}' AND TABLE_NAME='personal_access_tokens'", rows=True).strip()
    if has_pat:
        sql(c, "DELETE FROM personal_access_tokens", db)
        log("personal_access_tokens dikosongkan.")
        done = True
    cols = sql(c, "SELECT TABLE_NAME FROM information_schema.COLUMNS "
                  f"WHERE TABLE_SCHEMA='{db}' AND COLUMN_NAME='login_tokens'", rows=True).split("\n")
    for t in [x.strip() for x in cols if x.strip()]:
        if DB_NAME_RE.fullmatch(t):
            sql(c, f"UPDATE `{t}` SET login_tokens=NULL", db)
            log(f"{t}.login_tokens dikosongkan.")
            done = True
    if not done:
        log("Tidak ada tabel token yang dikenali (personal_access_tokens / login_tokens).")


# ---------------------------------------------------------------- config

def load_config():
    try:
        return json.loads(CONFIG_PATH.read_text())
    except Exception:
        return {}


def save_config(data):
    try:
        CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
        CONFIG_PATH.write_text(json.dumps(data, indent=2))
    except Exception:
        pass


# ---------------------------------------------------------------- CLI

def run_cli(args):
    password = args.password if args.password is not None else os.environ.get("LKS_DB_PASSWORD", "lks123")
    c = Conn(args.host, args.port, args.user, password, args.sudo)
    if not args.dump and not args.db:
        raise ToolError("Beri file dump atau --db.")
    db = args.db or detect_db(args.dump)

    if args.tokens_only:
        clear_tokens(c, db)
        return
    if not args.dump:
        raise ToolError("Reset penuh butuh file dump.")
    if not args.yes:
        ans = input(f"Database `{db}` akan DIHAPUS lalu diisi ulang dari {args.dump}. Lanjut? [y/N] ")
        if ans.strip().lower() not in ("y", "yes"):
            print("Dibatalkan.")
            return
    reset_database(c, db, args.dump, do_backup=not args.no_backup)


# ---------------------------------------------------------------- GUI (PyQt6)

def run_gui():
    from PyQt6.QtCore import QThread, pyqtSignal
    from PyQt6.QtGui import QFontDatabase
    from PyQt6.QtWidgets import (QApplication, QCheckBox, QFileDialog, QGridLayout, QGroupBox,
                                 QHBoxLayout, QLabel, QLineEdit, QMessageBox, QPlainTextEdit,
                                 QPushButton, QSpinBox, QVBoxLayout, QWidget)

    class Worker(QThread):
        line = pyqtSignal(str)
        finished_ok = pyqtSignal(bool)

        def __init__(self, fn):
            super().__init__()
            self.fn = fn

        def run(self):
            try:
                self.fn(self.line.emit)
                self.finished_ok.emit(True)
            except ToolError as e:
                self.line.emit(f"GAGAL: {e}")
                self.finished_ok.emit(False)
            except Exception as e:  # noqa
                self.line.emit(f"ERROR: {e!r}")
                self.finished_ok.emit(False)

    class Window(QWidget):
        def __init__(self):
            super().__init__()
            self.cfg = load_config()
            self.worker = None
            self.setWindowTitle("LKS Reset - database uji")
            self.setAcceptDrops(True)
            self.resize(720, 600)
            self._build()

        def _build(self):
            root = QVBoxLayout(self)

            # file dump + nama database
            top = QGroupBox("Dump dari mentor")
            g = QGridLayout(top)
            self.dump_edit = QLineEdit()
            self.dump_edit.setPlaceholderText("Pilih atau seret file .sql ke jendela ini")
            self.dump_edit.editingFinished.connect(self._on_dump_changed)
            pick = QPushButton("Pilih...")
            pick.clicked.connect(self._pick)
            self.db_edit = QLineEdit()
            self.db_hint = QLabel("")
            g.addWidget(QLabel("File dump"), 0, 0)
            g.addWidget(self.dump_edit, 0, 1)
            g.addWidget(pick, 0, 2)
            g.addWidget(QLabel("Database"), 1, 0)
            g.addWidget(self.db_edit, 1, 1)
            g.addWidget(self.db_hint, 1, 2)
            root.addWidget(top)

            # koneksi
            conn = QGroupBox("Koneksi MariaDB")
            h = QHBoxLayout(conn)
            self.host = QLineEdit(self.cfg.get("host", "127.0.0.1"))
            self.port = QSpinBox()
            self.port.setRange(1, 65535)
            self.port.setValue(int(self.cfg.get("port", 3306)))
            self.user = QLineEdit(self.cfg.get("user", "lks"))
            self.password = QLineEdit("lks123")
            self.password.setEchoMode(QLineEdit.EchoMode.Password)
            for label, w in (("Host", self.host), ("Port", self.port), ("User", self.user), ("Password", self.password)):
                h.addWidget(QLabel(label))
                h.addWidget(w)
            root.addWidget(conn)

            self.backup_chk = QCheckBox(f"Backup dulu ke {BACKUP_DIR}")
            self.backup_chk.setChecked(bool(self.cfg.get("backup", True)))
            root.addWidget(self.backup_chk)

            # tombol
            row = QHBoxLayout()
            self.btn_reset = QPushButton("Reset database (drop + import)")
            self.btn_tokens = QPushButton("Hapus token login saja")
            self.btn_test = QPushButton("Tes koneksi")
            self.btn_reset.clicked.connect(self._reset)
            self.btn_tokens.clicked.connect(self._tokens)
            self.btn_test.clicked.connect(self._test)
            for b in (self.btn_reset, self.btn_tokens, self.btn_test):
                row.addWidget(b)
            root.addLayout(row)

            self.log = QPlainTextEdit()
            self.log.setReadOnly(True)
            self.log.setFont(QFontDatabase.systemFont(QFontDatabase.SystemFont.FixedFont))
            root.addWidget(self.log, 1)
            if not CLIENT:
                self._log("Klien mariadb/mysql tidak ditemukan. Arch: sudo pacman -S mariadb-clients")

        # --- helpers
        def _log(self, text):
            self.log.appendPlainText(text)

        def _conn(self):
            return Conn(self.host.text().strip() or "127.0.0.1", self.port.value(),
                        self.user.text().strip(), self.password.text())

        def _remember(self):
            save_config({"host": self.host.text().strip(), "port": self.port.value(),
                         "user": self.user.text().strip(), "backup": self.backup_chk.isChecked(),
                         "last_dir": str(Path(self.dump_edit.text()).parent) if self.dump_edit.text() else ""})

        def _set_dump(self, path):
            self.dump_edit.setText(path)
            self._on_dump_changed()

        def _on_dump_changed(self):
            path = self.dump_edit.text().strip()
            if path and Path(path).is_file():
                try:
                    self.db_edit.setText(detect_db(path))
                    self.db_hint.setText("(terdeteksi)")
                except Exception as e:
                    self._log(f"Gagal membaca dump: {e}")

        def _pick(self):
            start = self.cfg.get("last_dir") or str(Path.home())
            path, _ = QFileDialog.getOpenFileName(self, "Pilih dump SQL", start, "SQL (*.sql);;Semua file (*)")
            if path:
                self._set_dump(path)

        def dragEnterEvent(self, event):
            if event.mimeData().hasUrls():
                event.acceptProposedAction()

        def dropEvent(self, event):
            urls = event.mimeData().urls()
            if urls:
                self._set_dump(urls[0].toLocalFile())

        def _busy(self, on):
            for b in (self.btn_reset, self.btn_tokens, self.btn_test):
                b.setEnabled(not on)

        def _run(self, fn):
            self._remember()
            self._busy(True)
            self.worker = Worker(fn)
            self.worker.line.connect(self._log)
            self.worker.finished_ok.connect(lambda ok: (self._busy(False), self._log("-- selesai --" if ok else "-- gagal --")))
            self.worker.start()

        # --- aksi
        def _test(self):
            c = self._conn()
            self._run(lambda log: test_connection(c, log))

        def _tokens(self):
            c, db = self._conn(), self.db_edit.text().strip()
            self._run(lambda log: clear_tokens(c, db, log))

        def _reset(self):
            c, db, path = self._conn(), self.db_edit.text().strip(), self.dump_edit.text().strip()
            if not path or not db:
                QMessageBox.warning(self, "LKS Reset", "Pilih file dump dan isi nama database dulu.")
                return
            ans = QMessageBox.question(
                self, "Konfirmasi reset",
                f"Database `{db}` akan DIHAPUS lalu diisi ulang dari:\n{path}\n\nLanjut?")
            if ans != QMessageBox.StandardButton.Yes:
                return
            do_backup = self.backup_chk.isChecked()
            self._run(lambda log: reset_database(c, db, path, do_backup, log))

    app = QApplication.instance() or QApplication(sys.argv)
    app.setStyle("Fusion")
    win = Window()
    win.show()
    return app.exec()


# ---------------------------------------------------------------- main

def build_parser():
    p = argparse.ArgumentParser(description="Reset database uji LKS dari file dump.")
    p.add_argument("dump", nargs="?", help="file .sql dari mentor")
    p.add_argument("--db", help="nama database (default: dideteksi dari dump)")
    p.add_argument("--host", default="127.0.0.1")
    p.add_argument("--port", type=int, default=3306)
    p.add_argument("--user", default="lks")
    p.add_argument("--password", default=None, help="default: $LKS_DB_PASSWORD atau lks123")
    p.add_argument("--sudo", action="store_true", help="login root lewat socket (sudo mariadb)")
    p.add_argument("--tokens-only", action="store_true", help="hanya hapus token login, data tetap")
    p.add_argument("--no-backup", action="store_true", help="lewati backup sebelum reset")
    p.add_argument("--yes", "-y", action="store_true", help="tanpa konfirmasi")
    p.add_argument("--gui", action="store_true", help="buka tampilan jendela")
    return p


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    args = build_parser().parse_args(argv)
    if args.gui or not argv:
        try:
            return run_gui()
        except ImportError:
            print("PyQt6 belum terpasang (Arch: sudo pacman -S python-pyqt6, atau pip install PyQt6).")
            print("Mode terminal: python lks_reset.py dump.sql")
            return 1
    try:
        run_cli(args)
    except ToolError as e:
        print(f"GAGAL: {e}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
