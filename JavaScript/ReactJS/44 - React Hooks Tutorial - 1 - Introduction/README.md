# 44 - React Hooks Tutorial - 1 - Introduction

Hooks adalah fungsi khusus (diawali `use`) yang memungkinkan functional component memakai state dan fitur React lain.

Kenapa hooks: class membingungkan (`this`, binding), logika terpecah di banyak lifecycle method,
dan sulit membagikan logika. Aturan hooks:
1. Panggil hanya di level teratas komponen (bukan di dalam if, loop, atau fungsi bersarang).
2. Panggil hanya dari functional component atau custom hook.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
