# Episode 06 - z-index

`z-index` mengatur urutan tumpukan elemen (angka lebih besar = di atas).
- Hanya bekerja pada elemen yang `position`-nya bukan static (atau item flex/grid).
- **Stacking context:** `position` + `z-index`, `opacity < 1`, `transform` membuat konteks baru; z-index anak tidak bisa melampaui konteks induknya.
- Hindari angka asal besar (9999); atur skala yang konsisten.

**Cara pakai:** buka `index.html` di browser, ubah CSS lalu refresh. Untuk materi responsif, kecilkan jendela browser atau pakai DevTools (F12) → mode device.
