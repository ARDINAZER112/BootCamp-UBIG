# 80 - React Render Tutorial - 3 - useState

Aturan re-render karena `useState`:
- Memanggil setter dengan nilai **berbeda** memicu render ulang.
- Memanggil dengan nilai **sama** (`Object.is`) biasanya tidak memicu render ulang anak-anaknya (React bisa render satu kali ekstra lalu berhenti).
- Setter di dalam handler digabung (batching) menjadi satu render.

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
- `UseStateDemo.jsx`
- `useRenderCount.js`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
