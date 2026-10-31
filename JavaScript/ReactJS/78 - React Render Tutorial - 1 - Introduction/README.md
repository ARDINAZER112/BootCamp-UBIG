# 78 - React Render Tutorial - 1 - Introduction

Seri ini membahas **kapan dan kenapa komponen React di-render ulang**, dan bagaimana mengoptimalkannya.

Memahami render penting agar tidak salah mengoptimalkan (misalnya memakai `memo` di tempat yang salah).
Topik: proses render, pemicu render (state, props, parent, context), immutability, `memo`, `useMemo`, `useCallback`, dan context.

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
- `Counter.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
