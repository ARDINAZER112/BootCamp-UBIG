# 119 - React Interview Questions - A Preparation Guide

Daftar pertanyaan wawancara React yang umum (ringkasan jawaban singkat):

1. **Apa itu React?** Library JS untuk membangun UI berbasis komponen.
2. **Virtual DOM?** Representasi UI di memori; React membandingkan versi lama dan baru lalu hanya mengubah bagian yang berbeda di DOM.
3. **Props vs state?** Props dari luar dan read-only; state milik komponen dan bisa berubah.
4. **Kenapa `key` di list?** Agar React mengenali item yang berubah, bertambah, atau hilang.
5. **Controlled vs uncontrolled?** Controlled: nilai form di state React. Uncontrolled: nilai dibaca dari DOM lewat ref.
6. **Fungsi `useEffect`?** Menjalankan side effect setelah render; dependency menentukan kapan ia jalan lagi.
7. **`useMemo` vs `useCallback`?** `useMemo` menyimpan nilai; `useCallback` menyimpan fungsi.
8. **Apa itu prop drilling dan solusinya?** Mengoper props lewat banyak level; solusi: context atau state management.
9. **Kapan komponen render ulang?** State berubah, props berubah, parent render ulang, atau context berubah.
10. **Apa itu HOC / render props / custom hooks?** Tiga pola berbagi logika. Hooks adalah yang paling modern.
11. **Apa itu Error Boundary?** Class component yang menangkap error render anak dan menampilkan UI cadangan.
12. **Apa itu Fragment dan Portal?** Fragment: bungkus tanpa node tambahan. Portal: render ke node DOM lain.

## Menjalankan proyek ini

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev
```

Lalu buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Isi `src/`

- `App.jsx`
- `Latihan.jsx`
- `main.jsx` (titik masuk), `index.css`

_Catatan: StrictMode sengaja tidak dipakai di `main`, supaya log lifecycle dan render tidak ganda._

---
_Catatan dan kode ditulis dari judul episode dan konsep React yang relevan, bukan dari transkrip video. Cocokkan dengan videonya kalau ada perbedaan._
