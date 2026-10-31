# 19 - ReactJS Tutorial - 19 - Index as Key Anti-pattern

Memakai index sebagai key aman **hanya jika** ketiga syarat ini terpenuhi:
1. List dan item bersifat statis (tidak berubah)
2. Item tidak punya id
3. List tidak akan diurutkan atau difilter ulang

Kalau list bisa ditambah, dihapus, atau diurutkan, index sebagai key menyebabkan bug
(state input salah tempat, render tidak efisien). Pakai id unik.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `Contoh.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
