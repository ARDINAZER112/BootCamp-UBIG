# 04 - Laravel 12 Tutorial #4 - Blade Template Laravel

Blade adalah template engine Laravel. Fitur utama:

- `{{ $var }}` mencetak data dengan escaping (aman dari XSS). `{!! $html !!}` tanpa escaping (hati-hati).
- Direktif: `@if`, `@foreach`, `@forelse`, `@isset`, `@empty`.
- **Layout**: `@extends`, `@section`, `@yield`.
- **Partial**: `@include('partials.navbar')`.
- **Component**: `<x-alert>` dengan `@props`.
- Komentar Blade: `{{-- komentar --}}`.

## File di folder ini

- `layouts/app.blade.php`
- `partials/navbar.blade.php`
- `home.blade.php`
- `components/alert.blade.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
