# 38 - ReactJS Tutorial - 38 - Context (Part 1)

Context mengirim data ke komponen yang dalam tanpa **prop drilling** (mengoper props lewat banyak level).
Langkah: (1) `createContext`, (2) bungkus dengan `Provider`, (3) ambil nilai di anak.

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
- `userContext.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
