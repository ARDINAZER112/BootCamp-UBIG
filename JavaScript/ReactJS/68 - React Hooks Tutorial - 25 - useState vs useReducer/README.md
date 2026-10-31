# 68 - React Hooks Tutorial - 25 - useState vs useReducer

Perbandingan singkat:

| | useState | useReducer |
|---|---|---|
| Tipe state | primitif (angka, string, boolean) | objek atau array kompleks |
| Jumlah transisi | sedikit | banyak, saling terkait |
| Logika update | sederhana, di tempat | dipusatkan di reducer |
| Pakai di banyak komponen | oper lewat props | lebih cocok dengan context |
| Kapan | form sederhana, toggle | state berstruktur, aturan bisnis |

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `Perbandingan.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
