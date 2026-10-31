# 03 - ReactJS Tutorial - 3 - Folder Structure

Struktur folder proyek React (Vite):

```
hello-react/
├── index.html        # titik masuk HTML, ada <div id="root">
├── package.json      # dependency dan script
├── vite.config.js    # konfigurasi Vite
├── public/           # aset statis
└── src/
    ├── main.jsx      # render <App /> ke #root
    ├── App.jsx       # komponen utama
    └── App.css
```

Alurnya: `index.html` memuat `main.jsx`, yang me-render `App` ke elemen `#root`.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
