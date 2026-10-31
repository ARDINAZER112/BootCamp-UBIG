# 12 - Laravel 12 Tutorial #12 - Cara Menampilkan Detail Data di Laravel 12

Halaman detail memakai rute dengan parameter `{product}`. Berkat **route model binding**, Laravel otomatis mengambil
`Product` berdasarkan id dan mengirimnya sebagai argumen controller. Kalau tidak ada, otomatis 404.

## File di folder ini

- `routes-web.php`
- `ProductController.php`
- `products/show.blade.php`
- `link-di-index.blade.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
