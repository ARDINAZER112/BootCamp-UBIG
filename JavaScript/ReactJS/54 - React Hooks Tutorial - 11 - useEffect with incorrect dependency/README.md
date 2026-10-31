# 54 - React Hooks Tutorial - 11 - useEffect with incorrect dependency

Kalau effect memakai state/props tapi tidak ada di dependency, effect memegang nilai lama (stale closure).
Contohnya timer yang selalu menampilkan nilai awal. Dua perbaikan: tambahkan dependency, atau pakai bentuk fungsi `setCount(prev => prev + 1)`.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `IntervalCounter.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
