# 47 - React Hooks Tutorial - 4 - useState with object

Berbeda dengan `setState` di class, setter `useState` **mengganti** seluruh nilai (tidak digabung).
Jadi saat mengubah satu properti objek, salin dulu properti lainnya dengan spread.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `NameForm.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
