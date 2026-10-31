# 04 - ReactJS Tutorial - 4 - Components

Bagian ini sudah dicocokkan dengan 6 frame dari videonya (ada di folder `frame/`).

**Apa itu komponen**
- Komponen menggambarkan **sebagian dari antarmuka (UI)**.
- Komponen **reusable** dan bisa **disarang (nested)** di dalam komponen lain.

**Contoh tata letak** (frame "Components"): satu halaman dipecah menjadi Header, Sidenav kiri,
Main Content, Sidenav kanan, dan Footer. Semuanya adalah komponen, dan di atasnya ada
**Root (App) Component** yang membungkus semuanya.

**Dua jenis komponen** (frame "Component Types")

| Stateless Functional Component | Stateful Class Component |
|---|---|
| Fungsi JavaScript biasa | Class yang meng-extend `Component` |
| Mengembalikan HTML (JSX) | Method `render()` yang mengembalikan HTML |

**Komponen dalam kode** (frame "Component in Code"): kode sebuah komponen ditulis di file JavaScript sendiri.
Komponen root bernama `App`, ada di `App.js`.

**Di VS Code** (proyek `hello-world`, file `src/App.js`): template awal berupa class `App` dengan `render()`
yang mengembalikan `div.App` → `header.App-header` → logo, teks "Hello World!", dan tautan "Learn React".

> Istilah "stateless" dan "stateful" berasal dari masa sebelum hooks. Sejak React 16.8,
> functional component juga bisa punya state lewat `useState` (dibahas di episode 7 dan seri Hooks).

**Ringkasan** (frame "Components Summary")
- Komponen menggambarkan bagian dari UI.
- Reusable dan bisa disarang di dalam komponen lain.
- Dua jenis: Stateless Functional Components dan Stateful Class Components.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `Welcome.jsx`
- `WelcomeClass.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Episode ini sudah dicocokkan dengan frame dari videonya (folder `frame/`). Kode di `src/` adalah versi yang bisa dijalankan dengan Vite._
