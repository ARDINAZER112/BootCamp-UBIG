# 67 - React Hooks Tutorial - 24 - Fetching data with useReducer Part 2

Bagian 2: tiga state (loading, error, post) disatukan jadi satu state di `useReducer`.
Dua action: `FETCH_SUCCESS` dan `FETCH_ERROR`.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `DataFetchingTwo.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
