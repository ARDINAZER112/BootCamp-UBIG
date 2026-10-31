# 16 - Laravel 12 Tutorial #16 - Resource Controller, CRUD Jadi Lebih Praktis

`Route::resource` mendaftarkan 7 rute CRUD sekaligus, dan `make:controller --resource` membuat 7 method-nya.

| Method | URI | Action | Nama rute |
|---|---|---|---|
| GET | /products | index | products.index |
| GET | /products/create | create | products.create |
| POST | /products | store | products.store |
| GET | /products/{product} | show | products.show |
| GET | /products/{product}/edit | edit | products.edit |
| PUT/PATCH | /products/{product} | update | products.update |
| DELETE | /products/{product} | destroy | products.destroy |

Rute di `web.php` jadi satu baris. Folder ini berisi hasil akhir CRUD lengkap dari episode 9–15.

## File di folder ini

- `perintah.sh`
- `routes-web.php`
- `ProductController.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
