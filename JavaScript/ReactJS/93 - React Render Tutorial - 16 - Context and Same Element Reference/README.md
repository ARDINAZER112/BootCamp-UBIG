# 93 - React Render Tutorial - 16 - Context and Same Element Reference

Digabungkan dengan trik elemen yang sama: kalau Provider menerima `children` dari komponen di atasnya,
children itu tidak ikut render ulang saat state Provider berubah. Hanya komponen yang memakai context yang render.

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
- `CountProvider.jsx`
- `Tombol.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
