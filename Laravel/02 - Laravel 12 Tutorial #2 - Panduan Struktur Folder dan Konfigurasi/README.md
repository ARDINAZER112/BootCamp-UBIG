# 02 - Laravel 12 Tutorial #2 - Panduan Struktur Folder dan Konfigurasi

Folder penting:

| Folder / file | Fungsi |
|---|---|
| `app/Models` | Model Eloquent |
| `app/Http/Controllers` | Controller |
| `bootstrap/app.php` | Konfigurasi routing, middleware, exception (di Laravel 11+ tidak ada lagi `Kernel.php`) |
| `config/` | File konfigurasi (`app.php`, `database.php`, ...) |
| `database/migrations` | Skema tabel |
| `database/seeders`, `factories` | Data awal dan data dummy |
| `public/` | Titik masuk web (`index.php`) dan aset publik |
| `resources/views` | Template Blade |
| `routes/web.php` | Rute halaman web |
| `storage/` | Log, cache, file upload |
| `.env` | Konfigurasi lingkungan (jangan di-commit) |

Konfigurasi dibaca lewat `config('app.name')` atau `env('APP_NAME')` (pakai `env()` hanya di dalam file `config/`).

## File di folder ini

- `bootstrap-app.php`
- `config-app-timezone.php`
- `pakai-config.php`

---
_Catatan ini ditulis dari judul episode dan konsep Laravel 12 yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan. Nama file mengikuti lokasi di proyek (mis. `products/index.blade.php` = `resources/views/products/index.blade.php`)._
