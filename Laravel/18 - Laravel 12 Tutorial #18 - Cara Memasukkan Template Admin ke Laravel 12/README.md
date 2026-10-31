# 18 - Laravel 12 Tutorial #18 - Cara Memasukkan Template Admin ke Laravel 12

Langkah memasang template admin (contoh: AdminLTE, SB Admin 2, Sneat, dsb.):

1. Download template, salin folder aset (css, js, img, plugins) ke `public/assets/admin/`.
2. Ubah `index.html` template jadi **layout Blade** (`layouts/admin.blade.php`).
3. Ganti semua path aset dengan `{{ asset('assets/admin/...') }}`.
4. Ganti bagian isi dengan `@yield('content')`.
5. Pecah bagian berulang (sidebar, navbar, footer) jadi `@include`.
6. Beri tanda menu aktif dengan `request()->routeIs()`.
7. Halaman lain cukup `@extends('layouts.admin')`.

Nama file CSS/JS di contoh ini hanya placeholder. Sesuaikan dengan template yang kamu pakai.

## File di folder ini

- `layouts/admin.blade.php`
- `partials/admin-sidebar.blade.php`
- `dashboard.blade.php`
- `routes-web.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
