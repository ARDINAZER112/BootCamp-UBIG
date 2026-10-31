# Episode 32 - Variable Scope

Scope = wilayah variabel bisa diakses.
- **Global**, **function scope** (`var`), **block scope** (`let`/`const`).
- Fungsi dalam bisa mengakses variabel luar (**lexical scope / closure**), tapi tidak sebaliknya.
- `var` di-hoist (diangkat, bernilai undefined); `let`/`const` ada di **temporal dead zone** sebelum deklarasi.

**Cara pakai:** Jalankan: `node script.js` (atau tempel ke Console browser F12).
