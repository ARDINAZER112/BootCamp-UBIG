# 58 - React Hooks Tutorial - 15 - useContext Hook Part 1

Masalah: mengoper props lewat banyak level (prop drilling).
Solusi: context. Bagian 1: buat context dan pasang Provider di level atas.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `ComponentC.jsx`
- `ComponentE.jsx`
- `ComponentF.jsx`
- `contexts.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
