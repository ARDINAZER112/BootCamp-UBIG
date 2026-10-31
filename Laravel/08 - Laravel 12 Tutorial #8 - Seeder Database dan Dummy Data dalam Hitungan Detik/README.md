# 08 - Laravel 12 Tutorial #8 - Seeder Database dan Dummy Data dalam Hitungan Detik

- **Seeder**: mengisi database dengan data awal.
- **Factory**: membuat data dummy acak memakai `fake()` (Faker).

`DatabaseSeeder` adalah pintu masuk; panggil seeder lain lewat `$this->call()`.

## File di folder ini

- `perintah.sh`
- `ProductFactory.php`
- `ProductSeeder.php`
- `DatabaseSeeder.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
