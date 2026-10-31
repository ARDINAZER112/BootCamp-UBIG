# 10 - Laravel 12 Tutorial #10 - Cara Menambahkan Data ke Database dan Notifikasi (CRUD Create)

**Create** butuh dua rute: `create` (menampilkan form, GET) dan `store` (menyimpan, POST).

- Form wajib memakai `@csrf`.
- Setelah simpan, redirect dengan pesan flash: `->with('success', '...')`.
- Pesan dibaca di layout lewat `session('success')` (sudah ada di layout episode 4).

## File di folder ini

- `routes-web.php`
- `ProductController.php`
- `products/create.blade.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
