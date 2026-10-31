# 104 - React TypeScript Tutorial - 11 - useState Type Assertion

Kalau kita yakin state tidak akan `null` (misalnya langsung diisi data awal), pakai **type assertion**
`{} as AuthUser`. Hati-hati: ini mematikan pengecekan, jadi pakai hanya saat yakin.

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
- `User.tsx`
- `main.tsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
