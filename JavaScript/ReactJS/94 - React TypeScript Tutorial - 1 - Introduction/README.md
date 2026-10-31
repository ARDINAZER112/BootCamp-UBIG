# 94 - React TypeScript Tutorial - 1 - Introduction

TypeScript menambahkan **tipe statis** ke JavaScript. Di React, tipe membantu:
- mendeteksi salah ketik dan salah props saat menulis kode (bukan saat runtime),
- autocomplete yang lebih baik di editor,
- dokumentasi props yang hidup.

Prasyarat: dasar React dan dasar TypeScript (tipe primitif, interface/type, union).

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
