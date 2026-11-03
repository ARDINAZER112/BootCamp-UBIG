# XX_SERVER_MODULE - Society Car Instalment REST API (Phase 1)

Laravel 11 + Sanctum + MySQL/MariaDB. Ganti `XX` dengan nomor komputer sebelum di-zip / dipasang.

## Isi folder
| Item | Keterangan |
|---|---|
| `BACKEND/` | Proyek Laravel 11 (REST API) |
| `db-dump.sql` | Struktur + data awal database (otomatis membuat DB `instalment_car_db`) |
| `db-diagram.pdf` | ER diagram |
| `instalment-car_postman_collection.json` | Postman collection (A1a - A4g) |

## Pemasangan di XAMPP / LAMPP
1. Salin folder ini ke `htdocs` (Windows: `C:\xampp\htdocs\`, Linux: `/opt/lampp/htdocs/`).
2. Jalankan **Apache** dan **MySQL** dari XAMPP/LAMPP control panel.
3. Import database:
   - phpMyAdmin: Import -> pilih `db-dump.sql`, atau
   - terminal: `mysql -u root < db-dump.sql`
4. Pasang dependency (butuh PHP >= 8.2 dan Composer):
   ```
   cd BACKEND
   composer install
   ```
5. `BACKEND/.env` sudah disiapkan (MySQL `127.0.0.1:3306`, DB `instalment_car_db`, user `root`, tanpa password). Sesuaikan jika berbeda.
   Jika perlu APP_KEY baru: `php artisan key:generate`.
6. Linux/LAMPP saja, beri izin tulis:
   ```
   chmod -R 775 storage bootstrap/cache
   ```
7. Buka di Postman: `http://localhost/XX_SERVER_MODULE/BACKEND/api/v1/auth/login`
   (tanpa port, tanpa `/public`). Di Postman ubah variabel koleksi `base_url` menjadi
   `http://localhost/XX_SERVER_MODULE/BACKEND`.

> Jangan jalankan `php artisan migrate`. Tabel sudah dibuat oleh `db-dump.sql`.

Alternatif tanpa Apache: `cd BACKEND && php artisan serve` lalu pakai `base_url` bawaan `http://127.0.0.1:8000`.

## Akun uji
`id_card_number` `20210001` s.d. `20210045`, password `121212`.

## Endpoint
| Method | URL | Keterangan |
|---|---|---|
| POST | `/api/v1/auth/login` | A1 login |
| POST | `/api/v1/auth/logout` | A1 logout |
| POST | `/api/v1/validation` | A2 request data validation (sekali saja) |
| GET | `/api/v1/validations` | A2 lihat data validation |
| GET | `/api/v1/instalment_cars` | A3 daftar mobil |
| GET | `/api/v1/instalment_cars/{id}` | A3 detail mobil |
| POST | `/api/v1/applications` | A4 ajukan instalment (sekali saja) |
| GET | `/api/v1/applications` | A4 daftar pengajuan |
| POST | `/api/v1/validator/reset` | *Bantu uji*: hapus riwayat apply society |
| POST | `/api/v1/validator/approve` | *Bantu uji*: set validation society jadi `accepted` |

Dua endpoint terakhir dipakai pre-request script Postman (A4a) dan hanya aktif jika `ENABLE_TEST_HELPERS=true` di `.env`. Set `false` bila tidak dibutuhkan.

## Catatan keputusan implementasi
- Response `401` dipakai juga untuk "Invalid field" dan "hanya sekali" mengikuti pola spesifikasi A4d/A4e.
- Kolom `validations.status` bernilai `declined` di database, tetapi API mengembalikan `rejected` sesuai spesifikasi.
- Urutan pengecekan `POST /applications`: token -> validation `accepted` -> field -> sudah pernah apply.
- `GET /validations` mengembalikan `{"validation": null}` jika society belum pernah request.
- `available_month` pada response mobil memiliki field tambahan `nominal` (cicilan per bulan); riwayat apply memiliki field tambahan `date`.
- Tabel `personal_access_tokens` pada dump ditambah kolom `expires_at` (dibutuhkan Sanctum 4).
- Data mobil (15 mobil, 46 opsi bulan) pada `db-dump.sql` adalah data contoh yang dibuat sendiri; ganti sesuai kebutuhan.
