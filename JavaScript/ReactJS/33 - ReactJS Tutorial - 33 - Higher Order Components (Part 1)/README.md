# 33 - ReactJS Tutorial - 33 - Higher Order Components (Part 1)

Higher Order Component (HOC) adalah fungsi yang menerima komponen dan mengembalikan komponen baru
dengan logika tambahan. Dipakai untuk berbagi logika antar komponen.

Bagian 1: buat HOC `withCounter` yang membawa state count dan fungsi increment.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `ClickCounter.jsx`
- `HoverCounter.jsx`
- `withCounter.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
