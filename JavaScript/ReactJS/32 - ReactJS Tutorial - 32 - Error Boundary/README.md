# 32 - ReactJS Tutorial - 32 - Error Boundary

Error Boundary menangkap error render di komponen anak dan menampilkan UI cadangan,
supaya seluruh aplikasi tidak blank. Hanya bisa berupa **class component**
(`getDerivedStateFromError` dan/atau `componentDidCatch`).
Tidak menangkap error di event handler atau kode async.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `ErrorBoundary.jsx`
- `Hero.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
