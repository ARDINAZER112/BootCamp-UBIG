# 21 - ReactJS Tutorial - 21 - Basics of Form Handling

**Controlled component**: nilai input disimpan di state, dan input membaca nilainya dari state (`value` + `onChange`).
Satu state objek bisa dipakai untuk banyak field. Jangan lupa `event.preventDefault()` saat submit.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `Form.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
