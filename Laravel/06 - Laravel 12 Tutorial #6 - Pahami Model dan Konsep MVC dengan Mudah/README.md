# 06 - Laravel 12 Tutorial #6 - Pahami Model dan Konsep MVC dengan Mudah

Model mewakili satu tabel dan dipakai lewat **Eloquent ORM**.
Konvensi: model `Product` memakai tabel `products`.

- `$fillable` menentukan kolom yang boleh diisi massal (`create`, `update`) dan melindungi dari mass assignment.
- `casts()` mengubah tipe data otomatis.
- Coba model di `php artisan tinker`.

## File di folder ini

- `perintah.sh`
- `Product.php`
- `tinker.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
