# 84 - React Render Tutorial - 7 - Same Element Reference

Kalau sebuah **elemen React** (hasil JSX) dibuat di luar komponen yang berubah, referensinya tetap sama,
dan React melewati render ulang elemen itu. Cara praktis: oper child lewat `children` dari komponen di atasnya.

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
- `Berat.jsx`
- `Counter.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
