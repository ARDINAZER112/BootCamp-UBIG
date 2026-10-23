# Episode 12 - Grid Layout

CSS Grid = layout 2 dimensi (baris + kolom). Pada container: `display: grid`.
- `grid-template-columns: 200px 1fr 1fr;` · `repeat(3, 1fr)` · `repeat(auto-fit, minmax(200px, 1fr))`
- `gap` jarak antar sel · `grid-column: 1 / 3` / `span 2` · `grid-template-areas` untuk layout bernama.
- Perataan: `justify-items`, `align-items`, `place-items`.

**Cara pakai:** buka `index.html` di browser, ubah CSS lalu refresh. Untuk materi responsif, kecilkan jendela browser atau pakai DevTools (F12) → mode device.
