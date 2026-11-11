# Web Tech Studio - REST API (Fase 1)

Isi folder: `overlay/` (kode Laravel), `db-dump.sql`, `postman_collection.json`,
`postman_environment.json` (host sudah terisi), `db-diagram.pdf`, `setup.sh`.

## Langkah (fish/bash, MariaDB, user `lks` sudah ada)
1. Database:
   sudo mariadb -e 'DROP DATABASE IF EXISTS wtid_academy; CREATE DATABASE wtid_academy;'
   sudo mariadb wtid_academy < db-dump.sql
   sudo mariadb -e 'GRANT ALL ON `wtid_academy`.* TO "lks"@"localhost"; FLUSH PRIVILEGES;'
2. `bash setup.sh`   (membuat BACKEND = Laravel 11 + Sanctum + kode overlay, mengisi .env)
3. `cd BACKEND && php artisan serve`
4. Postman: import collection + environment, pilih environment "WT ID Academy", jalankan.

Reset data uji: ulangi langkah 1.

## Alur Postman
- Collection memakai bearer `{{adminToken}}` untuk semua request, kecuali yang diganti `{{userToken}}`.
- Jalankan dulu **A2a - success as admin** dan **A2a - success as user** agar kedua token tersimpan.
- **A3a (logout)** mencabut token admin; jalankan **A2a admin** lagi sebelum request admin berikutnya (folder B dst.).
- **D4a** (complete lesson 1) harus jalan sebelum **E2a**, supaya progress punya lesson selesai.

## Keputusan / ketidakcocokan soal vs Postman (yang perlu kamu tahu)
- Login salah: docx menulis 400, test Postman A2b mengharapkan **401**. Dipilih 401
  (konstanta `INVALID_CREDENTIALS_STATUS` di `AuthController`).
- Register: contoh docx berisi `role`, tetapi test Postman A1a memeriksa kunci tanpa `role`. Dipilih tanpa `role`.
- GET /users/progress: docx menulis 201, test Postman mengharapkan **200**. Dipilih 200.
- Check answer punya tiga rute (muncul di Postman): `/lessons/{lesson}/contents/{content}/check`,
  `/lesson-contents/{content}/check`, dan `/lesson-contents/{content}/check-answer`.
  Urutan cek: option (404) -> content (404) -> bukan quiz (400).
- `is_published`: angka 1/0 di B4/B5/E2, boolean di B2 (sesuai test). `is_correct` di D3 berupa angka 1/0.
- C2 (hapus set): set harus milik kursus pada URL, selain itu 404. Request C2a di Postman memakai
  `web-api-architecture/sets/4` (set 4 milik kursus lain), jadi akan 404; request itu tidak punya assertion.
- Kursus draft: hanya admin yang bisa lihat detailnya (B5) dan user tidak bisa mendaftar ke kursus draft (404).
- Beberapa request Postman saling bertentangan (mis. D3c dan D3d memakai URL dan token sama tetapi
  hasil berbeda; D4a "not found" memakai lesson 1 seperti D4a sukses). Itu dari collection, bukan dari kode.
- Endpoint yang butuh peran user (check answer, complete, register course, progress) membalas 403 untuk admin.
