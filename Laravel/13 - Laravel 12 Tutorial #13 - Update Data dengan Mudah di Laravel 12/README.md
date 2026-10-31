# 13 - Laravel 12 Tutorial #13 - Update Data dengan Mudah di Laravel 12

**Update** juga dua rute: `edit` (form berisi data lama, GET) dan `update` (simpan, PUT/PATCH).
Browser hanya mendukung GET/POST, jadi form memakai `@method('PUT')` untuk memalsukan method.

## File di folder ini

- `routes-web.php`
- `ProductController.php`
- `products/edit.blade.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
