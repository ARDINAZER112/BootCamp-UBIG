# Episode 04 - Default Parameters

Beri nilai bawaan pada parameter: `function f(a, b = 10)`.
- Dipakai jika argumen `undefined` (bukan `null`, `0`, atau `""`).
- Default bisa berupa ekspresi atau pemanggilan fungsi, dan boleh merujuk parameter sebelumnya.
- Menggantikan pola lama `a = a || 10` yang salah untuk nilai falsy seperti 0.

**Cara pakai:** `node script.js` (atau tempel ke Console browser F12). Ubah kodenya lalu jalankan ulang.
