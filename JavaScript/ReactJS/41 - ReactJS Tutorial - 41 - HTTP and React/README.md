# 41 - ReactJS Tutorial - 41 - HTTP and React

React tidak punya cara bawaan untuk HTTP. Kita pakai `fetch` (bawaan browser) atau library seperti **axios**.
Pola umum: panggil API di `useEffect` / `componentDidMount`, simpan hasilnya di state.
API latihan: https://jsonplaceholder.typicode.com/posts

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `PostPreview.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
