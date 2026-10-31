# 86 - React Render Tutorial - 9 - Questions on Optimization

Pertanyaan yang sering muncul:

- **Kenapa tidak membungkus semua komponen dengan `memo`?** Perbandingan props punya biaya, dan sering tidak ada hasilnya.
- **Kenapa React tidak memo otomatis?** Tidak semua komponen untung, dan overhead perbandingan bisa lebih mahal dari render.
- **Kapan optimasi perlu?** Setelah diukur (React Profiler) dan terbukti ada masalah.
- **Strategi:** ukur dulu, perbaiki struktur (state turun ke bawah, children) sebelum memakai `memo`/`useMemo`.

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
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
