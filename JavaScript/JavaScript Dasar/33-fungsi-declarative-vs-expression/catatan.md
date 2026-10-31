# Episode 33 - Fungsi Declarative vs Expression

- **Declaration:** `function nama() {}` → di-hoist (bisa dipanggil sebelum definisi).
- **Expression:** `const nama = function() {}` → tidak di-hoist (ikut aturan variabelnya).
- **Arrow function:** `const nama = () => {}` (ES6) — ringkas, `this` mengikuti scope luar.
- **IIFE:** fungsi yang langsung dijalankan `(function(){ ... })()`.

**Cara pakai:** Jalankan: `node script.js` (atau tempel ke Console browser F12).
