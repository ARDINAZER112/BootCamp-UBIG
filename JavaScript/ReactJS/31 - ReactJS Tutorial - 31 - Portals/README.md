# 31 - ReactJS Tutorial - 31 - Portals

Portal me-render child ke node DOM lain di luar hirarki parent, cocok untuk modal dan tooltip.
Event tetap bubbling mengikuti pohon React, bukan pohon DOM.
Tambahkan `<div id="portal-root"></div>` di `index.html`.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `PortalDemo.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
