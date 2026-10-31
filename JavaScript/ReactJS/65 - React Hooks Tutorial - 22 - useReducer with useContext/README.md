# 65 - React Hooks Tutorial - 22 - useReducer with useContext

Kombinasi `useReducer` + `useContext` untuk state global sederhana tanpa library tambahan.
Provider menyimpan `count` dan `dispatch`, komponen mana pun di bawahnya bisa memakai keduanya.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `ComponentA.jsx`
- `CountContext.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
