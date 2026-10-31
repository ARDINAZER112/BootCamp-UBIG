# 08 - ReactJS Tutorial - 8 - JSX

JSX adalah sintaks mirip HTML di dalam JavaScript. Ia dikompilasi menjadi `React.createElement`.

Perbedaan dengan HTML:
- `class` menjadi `className`
- `for` menjadi `htmlFor`
- atribut ditulis camelCase (`onClick`, `tabIndex`)
- ekspresi JavaScript ditulis di dalam `{ }`
- satu root element saja (atau Fragment)

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `Jsx.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
