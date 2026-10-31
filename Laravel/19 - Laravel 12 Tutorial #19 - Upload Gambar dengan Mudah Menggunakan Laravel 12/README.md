# 19 - Laravel 12 Tutorial #19 - Upload Gambar dengan Mudah Menggunakan Laravel 12

Alur upload gambar:

1. Tambah kolom `image` di tabel (migration baru).
2. Form memakai `enctype="multipart/form-data"` dan `<input type="file">`.
3. Validasi: `image|mimes:jpg,jpeg,png,webp|max:2048` (KB).
4. Simpan dengan `$request->file('image')->store('products', 'public')`. File tersimpan di `storage/app/public/products` dengan nama acak.
5. Jalankan `php artisan storage:link` sekali, supaya `public/storage` menunjuk ke folder itu.
6. Tampilkan dengan `asset('storage/' . $product->image)`.
7. Saat update atau hapus, hapus file lama dengan `Storage::disk('public')->delete()`.

## File di folder ini

- `perintah.sh`
- `add_image_to_products_table.php`
- `ProductController.php`
- `form-upload.blade.php`
- `tampil-gambar.blade.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
