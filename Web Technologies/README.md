# LKS Reset

Mengembalikan database uji ke kondisi awal dari file dump mentor, untuk project LKS apa pun
(Starlight, Vaccinify, Web Tech Studio, Instalment Car, dan soal berikutnya).

Cara kerja: `DROP DATABASE` -> `CREATE DATABASE` -> import ulang dump.
Nama database dibaca otomatis dari dump (`CREATE DATABASE` / `USE` / `-- Database:`),
cadangannya nama file. Baris `CREATE/DROP/USE DATABASE` di dump dibuang saat import, jadi dump
tidak bisa menyasar database lain. Collation MySQL 8 (`utf8mb4_0900_ai_ci`) diganti otomatis
supaya bisa masuk ke MariaDB.

## Pasang (Arch)
    sudo pacman -S mariadb-clients python-pyqt6      # PyQt6 hanya untuk tampilan jendela

Beri user `lks` akses ke semua database, cukup sekali (khusus mesin lokal):

    sudo mariadb -e "GRANT ALL PRIVILEGES ON *.* TO 'lks'@'localhost'; FLUSH PRIVILEGES;"

Tanpa ini, `lks` hanya bisa mereset database yang sudah di-GRANT satu per satu.

## Tampilan jendela
    python lks_reset.py

Pilih atau seret file `.sql` ke jendela -> nama database terisi sendiri -> **Reset database**.
- **Hapus token login saja**: mengosongkan `personal_access_tokens` dan kolom `login_tokens`
  (logout semua sesi), data lain tetap.
- **Backup dulu**: menyimpan salinan ke `~/lks_backups/` (10 terakhir per database).

## Terminal
    python lks_reset.py dump.sql                 # tanya konfirmasi dulu
    python lks_reset.py dump.sql --yes           # langsung
    python lks_reset.py dump.sql --tokens-only   # hanya hapus token
    python lks_reset.py dump.sql --db nama_lain  # paksa nama database
    python lks_reset.py dump.sql --sudo          # login root lewat socket (sudo mariadb)

Opsi lain: `--host --port --user --password` (default `127.0.0.1:3306`, `lks`, `$LKS_DB_PASSWORD` atau `lks123`),
`--no-backup`.

## Pakai dengan Postman
Reset sebelum menjalankan collection dari awal, supaya data uji sebelumnya (user baru dari register,
reservasi, dll.) tidak membuat request pertama gagal.

## Peringatan
Reset MENGHAPUS seluruh isi database tersebut. Pakai hanya dengan dump seed dari mentor, jangan dengan
database hasil kerjamu sendiri kecuali backup dicentang.
