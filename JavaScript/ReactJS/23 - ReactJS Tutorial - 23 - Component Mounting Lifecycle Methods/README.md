# 23 - ReactJS Tutorial - 23 - Component Mounting Lifecycle Methods

Urutan saat komponen dibuat: `constructor` → `getDerivedStateFromProps` → `render` → `componentDidMount`.
`componentDidMount` dipakai untuk side effect seperti fetch data atau memasang event listener.

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
- `LifecycleA.jsx`
- `LifecycleB.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
