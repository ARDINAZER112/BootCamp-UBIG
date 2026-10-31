# 14 - Laravel 12 Tutorial #14 - Hapus Data dengan Mudah di Laravel 12

**Delete** memakai method `DELETE` lewat form (bukan link biasa), supaya aman dari CSRF dan tidak terhapus tidak sengaja.
Tambahkan konfirmasi `onsubmit="return confirm(...)"`.

Opsional: `SoftDeletes` membuat data hanya "ditandai terhapus" (kolom `deleted_at`) sehingga bisa dipulihkan.

## File di folder ini

- `routes-web.php`
- `ProductController.php`
- `tombol-hapus.blade.php`
- `soft-delete.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
