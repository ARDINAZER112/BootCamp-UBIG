# Episode 11 - Generators

Generator = fungsi yang bisa **dijeda dan dilanjutkan**. Ditulis `function*` dan memakai `yield`.
- Memanggil generator mengembalikan **iterator**; `next()` menjalankan sampai `yield` berikutnya → `{ value, done }`.
- Berguna untuk deret tak hingga, lazy evaluation, dan alur async (cikal bakal async/await).
- `yield*` mendelegasikan ke iterable lain. `next(x)` bisa mengirim nilai ke dalam generator.

**Cara pakai:** `node script.js` (atau tempel ke Console browser F12). Ubah kodenya lalu jalankan ulang.
