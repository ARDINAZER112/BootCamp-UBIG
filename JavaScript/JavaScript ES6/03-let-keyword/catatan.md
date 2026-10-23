# Episode 03 - The Let Keyword

`let` = variabel **block-scoped** yang bisa diubah nilainya.
Perbedaan dengan `var`: tidak di-hoist ke atas secara bernilai (ada *temporal dead zone*), tidak bisa dideklarasikan ulang di scope sama, dan setiap iterasi loop punya binding sendiri (menyelesaikan masalah closure di loop).

**Cara pakai:** `node script.js` (atau tempel ke Console browser F12). Ubah kodenya lalu jalankan ulang.
