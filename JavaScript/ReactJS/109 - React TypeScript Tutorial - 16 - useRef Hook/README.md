# 109 - React TypeScript Tutorial - 16 - useRef Hook

`useRef` untuk elemen DOM: beri tipe elemen dan nilai awal `null`, lalu pakai `?.` atau pengecekan sebelum memakai `.current`.
Untuk nilai mutable (misalnya timer), tipenya mengikuti isinya.

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
- `DomRef.tsx`
- `MutableRef.tsx`
- `main.tsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
