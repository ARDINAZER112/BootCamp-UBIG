# 73 - React Hooks Tutorial - 30 - Custom Hooks

Custom hook adalah fungsi biasa yang namanya diawali `use` dan memakai hook lain di dalamnya.
Gunanya berbagi **logika** (bukan UI) antar komponen, sebagai pengganti HOC dan render props.
Episode 74–76 membuat tiga contoh: `useDocumentTitle`, `useCounter`, `useInput`.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `useToggle.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
