# Starlight Observatory System - Server Side (Phase 1)

Isi folder:
- `BACKEND_OVERLAY/` : kode Laravel (models, controllers, routes, bootstrap/app.php, .htaccess)
- `db-dump.sql`      : database (dari file soal)
- `postman_collection.json` : koleksi tes (dari file soal)
- `db-diagram.pdf`   : ER diagram
- `setup.sh`         : membuat project Laravel 11 + Sanctum, lalu menimpa dengan overlay

## Cara pakai
1. `mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `starlight-observatory-db`'`
2. `mysql -u root starlight-observatory-db < db-dump.sql`
3. `./setup.sh` (butuh internet untuk composer)
4. `cd BACKEND && php artisan serve`, lalu jalankan Postman collection (base_url = http://127.0.0.1:8000)

Jangan jalankan `php artisan migrate`; semua tabel sudah ada di dump.

## Keputusan yang perlu kamu tahu
- Password society di seed berupa plaintext (`password123`), jadi login mendukung plaintext dan bcrypt.
- Status validasi di DB `declined`; respons API dipetakan ke `rejected` sesuai soal.
- `POST /validation` kedua kali: tidak membuat baris baru dan tidak mengubah status lama, tetap membalas 200.
  Ini perlu karena request A2a di Postman memakai johndoe yang sudah punya validasi di seed.
- Field `validator` di GET /validations berisi `{id, name}` bila ada, `null` bila belum (soal hanya menunjukkan null).
- Endpoint tambahan `POST /api/v1/testing/reset-reservation` dipanggil pre-request A4a di Postman.
  Hapus sebelum submit bila tidak diinginkan, tapi A4a akan gagal saat diulang.
