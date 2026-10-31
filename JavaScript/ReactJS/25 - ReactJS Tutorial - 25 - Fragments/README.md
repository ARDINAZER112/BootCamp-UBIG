# 25 - ReactJS Tutorial - 25 - Fragments

Fragment membungkus beberapa elemen tanpa menambah node ekstra di DOM.
Berguna untuk `<tr>` yang berisi `<td>`, atau list dengan key (`<Fragment key=...>`).
Bentuk pendek `<>...</>` tidak bisa menerima `key`.

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
- `Columns.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
