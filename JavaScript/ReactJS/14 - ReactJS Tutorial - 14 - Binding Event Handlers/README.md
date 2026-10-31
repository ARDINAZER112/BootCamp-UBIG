# 14 - ReactJS Tutorial - 14 - Binding Event Handlers

Di class component, `this` di dalam handler hilang kalau method dilewatkan begitu saja.
Ada 4 cara mengatasinya:

1. `.bind(this)` di `render` (kurang efisien)
2. arrow function di `render`
3. `.bind(this)` di constructor (cara yang direkomendasikan di class)
4. arrow function sebagai class property (paling ringkas)

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
- `EventBind.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
