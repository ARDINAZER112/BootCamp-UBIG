# 15 - Laravel 12 Tutorial #15 - Cari Data di Laravel Semudah Itu

Pencarian memakai query string (`?search=kopi`) lewat form GET.

- `when()` hanya menambah kondisi kalau input ada.
- `where('name', 'like', "%$kata%")` untuk pencarian sebagian.
- `withQueryString()` menjaga kata pencarian saat pindah halaman paginasi.

## File di folder ini

- `ProductController.php`
- `form-cari.blade.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
