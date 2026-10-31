# 118 - React TypeScript Tutorial - 25 - Wrapping up

Ringkasan seri React + TypeScript:

- Props: tipe dasar, opsional, union, children, event, style.
- Hooks: `useState`, `useReducer` (action ketat), `useContext`, `useRef`.
- Class component dengan generik `Component<P, S>`.
- Teknik lanjutan: generic props, restricting props, template literal + `Exclude`,
  membungkus elemen HTML, mengekstrak tipe props, komponen polimorfik.

Saran: lanjutkan dengan membuat proyek kecil sendiri, dan baca "React TypeScript Cheatsheets".

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

Pemeriksaan tipe: `npm run typecheck`

## Isi `src/`

- `App.tsx`
- `main.tsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
