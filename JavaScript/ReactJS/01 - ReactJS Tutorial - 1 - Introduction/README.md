# 01 - ReactJS Tutorial - 1 - Introduction

React adalah library JavaScript untuk membangun antarmuka (UI) berbasis **komponen**.

- UI dipecah jadi komponen kecil yang bisa dipakai ulang.
- Tampilan ditentukan oleh data (props dan state), bukan manipulasi DOM manual.
- React memakai Virtual DOM supaya update tampilan efisien.
- Prasyarat: HTML, CSS, dan JavaScript modern (ES6: arrow function, destructuring, modules).

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
