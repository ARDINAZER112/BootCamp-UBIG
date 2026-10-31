function* hitung() {
  console.log("mulai");
  yield 1;
  console.log("lanjut");
  yield 2;
  return 3;
}
const g = hitung();
console.log(g.next());   // { value: 1, done: false }
console.log(g.next());   // { value: 2, done: false }
console.log(g.next());   // { value: 3, done: true }
console.log(g.next());   // { value: undefined, done: true }

// Dipakai dengan for...of dan spread
function* satuSampai(n) { for (let i = 1; i <= n; i++) yield i; }
console.log([...satuSampai(5)]);
for (const x of satuSampai(3)) console.log(x);

// Deret tak hingga (lazy): Fibonacci
function* fib() {
  let [a, b] = [0, 1];
  while (true) { yield a; [a, b] = [b, a + b]; }
}
const hasil = [];
for (const n of fib()) { if (n > 50) break; hasil.push(n); }
console.log(hasil);

// yield* mendelegasikan
function* gabung() { yield* [1, 2]; yield* "ab"; }
console.log([...gabung()]);

// Dua arah: next(nilai)
function* tanya() {
  const nama = yield "Siapa namamu?";
  const umur = yield `Halo ${nama}, umurmu?`;
  return `${nama} (${umur})`;
}
const t = tanya();
console.log(t.next().value);
console.log(t.next("Arcana").value);
console.log(t.next(20).value);

// Membuat objek iterable sendiri
const rentang = { dari: 1, sampai: 4, *[Symbol.iterator]() { for (let i = this.dari; i <= this.sampai; i++) yield i; } };
console.log([...rentang]);
