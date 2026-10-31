# 112 - React TypeScript Tutorial - 19 - Generic Props

Generic props membuat komponen fleksibel tapi tetap aman tipe. Contoh: `List` yang menerima array bertipe apa saja
(`T`) dan memberi `onClick` dengan tipe item yang sama.

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
- `List.tsx`
- `main.tsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
