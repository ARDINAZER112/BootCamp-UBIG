# 22 - ReactJS Tutorial - 22 - Component Lifecycle Methods

Setiap class component melewati 4 fase:

| Fase | Method |
|---|---|
| Mounting | `constructor`, `static getDerivedStateFromProps`, `render`, `componentDidMount` |
| Updating | `static getDerivedStateFromProps`, `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, `componentDidUpdate` |
| Unmounting | `componentWillUnmount` |
| Error handling | `static getDerivedStateFromError`, `componentDidCatch` |

Di functional component, peran ini digantikan `useEffect`.

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
- `LifecycleDemo.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
