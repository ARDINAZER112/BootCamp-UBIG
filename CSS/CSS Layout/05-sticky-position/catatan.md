# Episode 05 - Sticky Position

`position: sticky` = gabungan relative dan fixed: elemen normal sampai mencapai ambang scroll (`top`), lalu "menempel".
- **Wajib** punya `top`/`bottom`/`left`/`right`.
- Menempel hanya selama masih di dalam parent-nya.
- Tidak bekerja jika ada ancestor dengan `overflow: hidden/auto`.

**Cara pakai:** buka `index.html` di browser, ubah CSS lalu refresh. Untuk materi responsif, kecilkan jendela browser atau pakai DevTools (F12) → mode device.
