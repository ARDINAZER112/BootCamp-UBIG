# 11 - Laravel 12 Tutorial #11 - Cara Validasi Form di Laravel 12 dengan Mudah

Validasi memastikan data dari user benar sebelum disimpan.

- `$request->validate([...])`: kalau gagal, user otomatis dikembalikan ke form beserta error dan input lama.
- Di Blade: `@error('field')` menampilkan pesan, `old('field')` mengisi ulang input.
- Pesan kustom bisa dikirim sebagai argumen kedua. Untuk pesan berbahasa Indonesia otomatis, jalankan `php artisan lang:publish` dan buat `lang/id/validation.php`.
- Untuk validasi yang besar, pindahkan ke **Form Request** (`make:request`).

## File di folder ini

- `perintah.sh`
- `validasi-di-controller.php`
- `StoreProductRequest.php`
- `form-error.blade.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
