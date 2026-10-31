# 77 - How To Debug React Apps

Cara men-debug aplikasi React:

1. **Console**: `console.log`, `console.table`, `console.error`.
2. **React Developer Tools** (ekstensi browser): lihat pohon komponen, props, state, dan hooks. Ada profiler untuk render.
3. **Breakpoint di tab Sources**: jeda eksekusi dan telusuri nilai variabel.
4. **Pernyataan `debugger;`**: browser berhenti di baris itu kalau DevTools terbuka.
5. **Debugger di VS Code**: konfigurasi `launch.json` bertipe `chrome`, lalu pasang breakpoint dari editor.
6. **Baca pesan error**: React menunjukkan nama komponen dan baris yang bermasalah.

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
