# 60 - React Hooks Tutorial - 17 - useContext Hook Part 3

Bagian 3: perbandingan dengan cara lama dan ringkasan.
- Cara lama: `<UserContext.Consumer>{(user) => ...}</UserContext.Consumer>` (bersarang kalau banyak context).
- Cara baru: `const user = useContext(UserContext)` (datar dan mudah dibaca).

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
- `contexts.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
