# 92 - React Render Tutorial - 15 - Context and memo

`memo` tidak memblokir render yang berasal dari **context**. Komponen yang memanggil `useContext`
akan tetap render saat nilai context berubah. Namun `memo` tetap berguna untuk komponen
di antaranya yang tidak memakai context.

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
- `Komponen.jsx`
- `ThemeContext.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
