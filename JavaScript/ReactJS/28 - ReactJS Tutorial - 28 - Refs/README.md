# 28 - ReactJS Tutorial - 28 - Refs

Ref memberi akses langsung ke elemen DOM, misalnya untuk fokus ke input.
Buat dengan `createRef` (class) atau `useRef` (function), pasang lewat atribut `ref`, baca di `.current`.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `ClassRef.jsx`
- `FocusInput.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
