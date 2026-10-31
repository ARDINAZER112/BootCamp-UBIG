# 70 - React Hooks Tutorial - 27 - useMemo Hook

`useMemo(fn, deps)` menyimpan **hasil perhitungan** dan hanya menghitung ulang kalau dependency berubah.
Cocok untuk perhitungan mahal. Hasil yang sudah dihitung tidak diulang saat state lain berubah.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `Counter.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
