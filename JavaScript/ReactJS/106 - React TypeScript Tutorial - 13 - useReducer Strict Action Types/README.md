# 106 - React TypeScript Tutorial - 13 - useReducer Strict Action Types

Supaya `type` action tidak sembarang string, pakai **union / discriminated union**.
Dengan begitu `reset` tidak boleh punya `payload`, dan salah ketik `"incremnt"` langsung error.

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
- `Counter.tsx`
- `main.tsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
