# Episode 13 - Responsive Layout - Intro dan Viewport

Responsive web design = satu halaman nyaman di semua ukuran layar.
**Wajib** ada meta viewport di `<head>`:
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
Tanpa ini, browser mobile menampilkan halaman selebar ±980px lalu mengecilkannya.
Prinsip: lebar fleksibel (%, fr, max-width), gambar fleksibel (`max-width:100%`), media query, pendekatan mobile-first.

**Cara pakai:** buka `index.html` di browser, ubah CSS lalu refresh. Untuk materi responsif, kecilkan jendela browser atau pakai DevTools (F12) → mode device.
