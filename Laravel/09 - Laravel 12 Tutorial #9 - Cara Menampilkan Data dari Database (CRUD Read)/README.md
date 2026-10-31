# 09 - Laravel 12 Tutorial #9 - Cara Menampilkan Data dari Database (CRUD Read)

**Read**: ambil data dari model di controller, kirim ke view.

- `Product::latest()->paginate(10)` mengambil data terbaru dengan pagination.
- Di view, `$products->links()` menampilkan tombol halaman.
- Kalau memakai Bootstrap, aktifkan style paginasi di `AppServiceProvider::boot()`.

## File di folder ini

- `ProductController.php`
- `AppServiceProvider.php`
- `products/index.blade.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
