# 116 - React TypeScript Tutorial - 23 - Extracting a Components Prop Types

Mengambil tipe props dari komponen yang sudah ada dengan `React.ComponentProps<typeof Komponen>`,
tanpa harus meng-export tipe aslinya. Berguna saat memakai komponen pihak ketiga.

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
- `Ekstrak.tsx`
- `Greet.tsx`
- `main.tsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
