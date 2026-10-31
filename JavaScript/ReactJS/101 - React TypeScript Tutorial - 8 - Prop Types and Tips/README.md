# 101 - React TypeScript Tutorial - 8 - Prop Types and Tips

Tips:
- Simpan tipe props di file terpisah (`Greet.types.ts`) lalu `export` dan `import`.
- Pakai `type` atau `interface`, yang penting konsisten.
- Gunakan ekstensi bawaan editor (hover, Go to Definition) untuk melihat tipe.
- Untuk tipe event/elemen, biarkan TypeScript menebak dulu (hover di handler inline) baru tulis tipenya.

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
- `Greet.tsx`
- `Greet.types.ts`
- `main.tsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
