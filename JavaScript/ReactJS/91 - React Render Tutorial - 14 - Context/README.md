# 91 - React Render Tutorial - 14 - Context

Saat nilai di `Provider` berubah, **semua komponen yang memakai context itu** render ulang,
meski `memo` terpasang di sekitarnya. Kalau `value` berupa objek inline, ia berubah tiap render Provider.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

Buka **console browser** (F12) untuk melihat hasil `console.log`.

## Isi `src/`

- `App.jsx`
- `ThemeContext.jsx`
- `Tombol.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
