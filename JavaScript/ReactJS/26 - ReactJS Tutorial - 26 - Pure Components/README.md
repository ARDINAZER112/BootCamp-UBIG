# 26 - ReactJS Tutorial - 26 - Pure Components

`PureComponent` otomatis membandingkan props dan state secara **shallow** dan melewati render kalau tidak ada perubahan.
Syarat: jangan mutasi state/props (buat objek/array baru).

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

Buka **console browser** (F12) untuk melihat hasil `console.log`.

## Isi `src/`

- `App.jsx`
- `ParentComp.jsx`
- `PureComp.jsx`
- `RegComp.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
