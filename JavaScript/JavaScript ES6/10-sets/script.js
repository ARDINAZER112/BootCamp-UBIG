const s = new Set([1, 2, 2, 3, 3, 3]);
console.log(s, s.size);              // Set(3) {1,2,3} 3

s.add(4).add(2);                     // 2 sudah ada: diabaikan
console.log(s.has(4), s.has(99));
s.delete(1);
console.log([...s]);

for (const n of s) console.log(n);
s.forEach(n => console.log("forEach", n));

// Hapus duplikat dari array
const unik = [...new Set(["a", "b", "a", "c", "b"])];
console.log(unik);

// Operasi himpunan
const A = new Set([1, 2, 3, 4]), B = new Set([3, 4, 5]);
const union = new Set([...A, ...B]);
const irisan = new Set([...A].filter(x => B.has(x)));
const selisih = new Set([...A].filter(x => !B.has(x)));
console.log([...union], [...irisan], [...selisih]);

// Objek dibandingkan berdasarkan referensi
const t = new Set([{ a: 1 }, { a: 1 }]);
console.log(t.size);                 // 2

// Map sebagai pelengkap
const m = new Map([["a", 1]]);
m.set("b", 2);
console.log(m.get("a"), m.size, [...m.keys()]);
