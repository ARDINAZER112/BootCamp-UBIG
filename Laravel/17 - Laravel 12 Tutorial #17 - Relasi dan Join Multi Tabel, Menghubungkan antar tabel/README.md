# 17 - Laravel 12 Tutorial #17 - Relasi dan Join Multi Tabel, Menghubungkan antar tabel

Relasi Eloquent:

- `hasMany` / `belongsTo`: satu kategori punya banyak produk; satu produk milik satu kategori.
- `belongsToMany`: banyak-ke-banyak (butuh tabel pivot), misalnya produk dan tag.
- **Eager loading** `with('category')` mencegah masalah N+1 query.
- Alternatif tanpa relasi: **Query Builder join** (`DB::table()->join()`).

## File di folder ini

- `perintah.sh`
- `create_categories_table.php`
- `add_category_id_to_products_table.php`
- `Category.php`
- `Product.php`
- `ProductController.php`
- `view-relasi.blade.php`
- `CategorySeeder.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
