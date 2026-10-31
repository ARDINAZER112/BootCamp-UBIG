# 20 - Laravel 12 Tutorial #20 - Mengubah Teks Menjadi QR Code dan Barcode dengan Mudah

Membuat QR Code dan Barcode di Laravel memakai package:

- **QR Code**: `simplesoftwareio/simple-qrcode`
- **Barcode**: `picqer/php-barcode-generator`

Format **SVG** tidak butuh ekstensi tambahan, jadi paling mudah. PNG butuh `gd` atau `imagick`.

**Perhatian kompatibilitas:** `simple-qrcode` (v4.2) membutuhkan `bacon/bacon-qr-code ^2`, sedangkan Laravel Fortify dan starter kit
(Breeze/Jetstream/starter kit Laravel 12) memakai `^3`. Pada proyek seperti itu `composer require` akan gagal.
Solusinya pakai `bacon/bacon-qr-code` langsung (contoh ada di folder ini).

## File di folder ini

- `perintah.sh`
- `ProductController.php`
- `products/label.blade.php`
- `routes-web.php`
- `qr-dengan-bacon.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
