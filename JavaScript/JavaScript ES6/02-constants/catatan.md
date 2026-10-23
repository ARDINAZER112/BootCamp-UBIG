# Episode 02 - Constants (const)

`const` mendeklarasikan variabel yang **tidak bisa di-assign ulang**, block-scoped, wajib diisi saat dideklarasikan.
- Objek/array `const`: isinya **masih bisa diubah** (referensinya tetap).
- Untuk benar-benar membekukan objek: `Object.freeze()` (dangkal/shallow).
- Praktik baik: pakai `const` secara default, `let` hanya bila perlu diubah.

**Cara pakai:** `node script.js` (atau tempel ke Console browser F12). Ubah kodenya lalu jalankan ulang.
