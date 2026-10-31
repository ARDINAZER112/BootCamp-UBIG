# 79 - React Render Tutorial - 2 - Rendering

Dua fase:
1. **Render phase**: React memanggil fungsi komponen untuk membuat elemen React (Virtual DOM) baru, lalu membandingkannya dengan yang lama (reconciliation).
2. **Commit phase**: hanya perbedaan yang diterapkan ke DOM asli.

"Render" artinya fungsi komponen dipanggil, **bukan** berarti DOM pasti berubah.
Komponen di-render saat pertama muncul (initial render) dan saat ada pemicu re-render.

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
- `Render.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
