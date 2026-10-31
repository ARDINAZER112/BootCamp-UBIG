# 11 - ReactJS Tutorial - 11 - setState

Aturan `setState`:
- Jangan ubah `this.state` langsung. Selalu pakai `setState`.
- `setState` bersifat asinkron dan bisa digabung (batching).
- Kalau state baru bergantung pada state lama, pakai bentuk fungsi `(prevState) => ...`.
- Untuk menjalankan kode setelah state terbarui, pakai callback argumen kedua.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `Counter.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
