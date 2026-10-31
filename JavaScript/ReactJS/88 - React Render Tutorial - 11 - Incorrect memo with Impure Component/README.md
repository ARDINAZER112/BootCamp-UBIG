# 88 - React Render Tutorial - 11 - Incorrect memo with Impure Component

Komponen yang dibungkus `memo` harus **pure**: output hanya bergantung pada props/state.
Kalau komponen membaca nilai yang bisa berubah di luar React (`Date.now()`, variabel global, `Math.random()`),
`memo` bisa membuat tampilan usang karena komponen dilewati.

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
- `Jam.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
