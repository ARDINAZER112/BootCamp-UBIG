# 40 - ReactJS Tutorial - 40 - Context (Part 3)

Bagian 3: nilai default dan `contextType` (class component).
- Default value dipakai kalau tidak ada Provider di atasnya.
- Di class: `static contextType = UserContext` lalu akses lewat `this.context`.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `ComponentF.jsx`
- `userContext.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
