# Episode 09 - Arrow Functions

Sintaks ringkas fungsi: `(a, b) => a + b`.
- Satu parameter boleh tanpa kurung; satu ekspresi → **return implisit**. Mengembalikan objek literal harus dibungkus kurung: `() => ({ a: 1 })`.
- **`this` leksikal:** arrow tidak punya `this` sendiri (mengambil dari scope luar).
- Tidak punya `arguments`, tidak bisa dipakai sebagai constructor (`new`).
- Jangan dipakai untuk method objek yang butuh `this` objek itu.

**Cara pakai:** `node script.js` (atau tempel ke Console browser F12). Ubah kodenya lalu jalankan ulang.
