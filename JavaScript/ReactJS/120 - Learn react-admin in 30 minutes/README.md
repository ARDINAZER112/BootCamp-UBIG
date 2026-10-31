# 120 - Learn react-admin in 30 minutes

**react-admin** adalah framework untuk membangun aplikasi admin/CRUD di atas React dan REST/GraphQL API.
Kamu mendeklarasikan **resource**, dan react-admin menyediakan list, edit, create, dan show.

Alur umum:
1. Buat proyek React (Vite).
2. Instal `react-admin` dan data provider (contoh: `ra-data-json-server`).
3. Deklarasikan `<Admin>` dengan `<Resource>`.
4. Buat komponen `List`, `Edit`, `Create` memakai `<Datagrid>`, `<SimpleForm>`, dan input/field bawaan.

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
