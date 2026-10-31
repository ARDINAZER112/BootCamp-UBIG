# 30 - ReactJS Tutorial - 30 - Forwarding Refs

`forwardRef` meneruskan ref dari parent melewati child ke elemen DOM di dalam child.
(React 19 sudah memperbolehkan `ref` sebagai prop biasa di functional component.)

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `FRInput.jsx`
- `Parent.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
