# 99 - React TypeScript Tutorial - 6 - Event Props

Tipe untuk props berupa fungsi dan event.
- Tanpa parameter: `() => void`
- Dengan event: `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`
- Dengan nilai: `(id: number) => void`

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
- `Button.tsx`
- `Input.tsx`
- `main.tsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
