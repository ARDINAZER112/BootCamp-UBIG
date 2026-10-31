# 07 - Laravel 12 Tutorial #7 - Migration dan Struktur Database Dijelaskan

Migration adalah "version control" untuk skema database: tiap perubahan tabel ditulis sebagai file PHP.

- `up()` menjalankan perubahan, `down()` membatalkannya.
- `php artisan migrate` menjalankan migration yang belum dijalankan.
- Untuk mengubah tabel yang sudah ada, buat migration **baru** (jangan edit yang lama kalau sudah dipakai).

## File di folder ini

- `perintah.sh`
- `create_products_table.php`
- `add_sku_to_products_table.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
