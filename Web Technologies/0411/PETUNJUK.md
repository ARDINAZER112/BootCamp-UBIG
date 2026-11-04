# Vaccinify - REST API Society

Isi folder: `overlay/` (kode Laravel), `db-dump.sql`, `postman_collection.json`,
`postman_environment.json` (sudah terisi), `db-diagram.pdf`, `setup.sh`.

## Langkah (fish/bash, MariaDB)
1. Database:
   sudo mariadb -e 'DROP DATABASE IF EXISTS vaccinify; CREATE DATABASE vaccinify;'
   sudo mariadb vaccinify < db-dump.sql
   sudo mariadb -e 'GRANT ALL ON `vaccinify`.* TO "lks"@"localhost"; FLUSH PRIVILEGES;'
   (user `lks` / `lks123` dibuat dulu bila belum ada, sama seperti modul Starlight)
2. `./setup.sh`  (membuat project Laravel 11 di folder ini, menimpa dengan overlay, mengisi .env)
3. `php artisan serve` lalu import `postman_collection.json` + `postman_environment.json`.

Reset data uji: ulangi langkah 1 (dump tidak punya DROP TABLE).

## Akun uji di Postman (password semua `121212`)
| Request | id_card_number | Alasan |
|---|---|---|
| A1, A2, A3, A4a, A4e, A4g | 20210005 | konsultasi accepted, belum pernah vaksin |
| A4c (konsultasi belum accepted) | 20210003 | konsultasi pending |
| A4f (sudah 2x vaksin) | 20210011 | punya dosis 1 dan 2 di seed |

Ganti `id_card_number` di environment lalu jalankan **A1a** lagi sebelum request yang butuh akun lain.
Setelah **A1c** (logout), token lama tidak berlaku: jalankan A1a lagi.
A4a dan A4e memakai tanggal tetap 2021-12-25: A4a berhasil (dosis 1), A4e ditolak (kurang dari 30 hari).
A4a hanya bisa berhasil sekali per akun; untuk mengulang, reset database.

## Keputusan yang perlu kamu tahu
- Token = md5(id_card_number), disimpan di `societies.login_tokens`, dikirim via `?token=`. Logout mengosongkannya.
- `declined` di DB dipetakan menjadi `rejected` di respons.
- POST /consultations kedua kali tidak membuat baris baru dan tidak mengubah data lama, tetap 200.
- `status` vaksinasi: `done` jika `vaccine_id` terisi, selain itu `pending` (soal hanya menunjukkan "done").
- `queue` = urutan pendaftaran pada spot dan tanggal yang sama (berdasarkan id).
- `vaccinator` = dokter (`doctor_id`) pada data vaksinasi; `null` bila belum diproses.
- Request A2c/A2d di collection memakai `http://localhost:8000` tertulis langsung, bukan `{{url}}`.
