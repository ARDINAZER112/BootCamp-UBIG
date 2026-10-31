# 89 - React Render Tutorial - 12 - Incorrect memo with props Reference

Objek, array, dan fungsi yang dibuat inline di parent punya **referensi baru** setiap render,
sehingga `memo` di child gagal. Solusi: `useMemo` untuk objek/array dan `useCallback` untuk fungsi,
atau definisikan di luar komponen kalau nilainya tetap.

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
- `Child.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
