# Episode 07 - Aturan Cascade

Jika beberapa rule mengenai elemen yang sama, browser memilih pemenang berdasarkan:
1. **Importance** — `!important` menang (hindari dipakai sembarangan)
2. **Specificity** — inline (1000) > ID (100) > class/atribut/pseudo-class (10) > elemen (1)
3. **Urutan** — jika setara, rule yang **paling akhir** menang.
Pada contoh, teks akhirnya berwarna hijau karena specificity ID.

**Cara pakai:** buka `index.html` di browser, lalu ubah CSS dan refresh.
