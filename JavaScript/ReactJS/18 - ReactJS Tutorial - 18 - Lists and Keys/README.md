# 18 - ReactJS Tutorial - 18 - Lists and Keys

`key` membantu React mengenali item mana yang berubah, ditambah, atau dihapus.
Key harus unik di antara saudara-saudaranya dan stabil (jangan acak tiap render).
`key` tidak diteruskan sebagai prop ke komponen.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `PersonList.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
