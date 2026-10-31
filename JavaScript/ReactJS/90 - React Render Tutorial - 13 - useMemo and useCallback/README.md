# 90 - React Render Tutorial - 13 - useMemo and useCallback

Dua hook untuk menjaga **referensi tetap sama** antar render:

- `useMemo(() => nilai, deps)`: menyimpan nilai (objek, array, hasil hitung).
- `useCallback(fn, deps)`: menyimpan fungsi.

Dua tujuan: (1) menghindari perhitungan mahal, (2) membuat `memo` di child efektif.
Jangan dipakai di mana-mana. Pakai hanya kalau ada masalah yang terukur.

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
- `Induk.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
