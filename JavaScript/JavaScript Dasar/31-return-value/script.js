function tambah(a, b) {
  return a + b;
  console.log("tidak pernah dijalankan");
}
const hasil = tambah(2, 3);
console.log(hasil);

function tanpaReturn() {}
console.log(tanpaReturn());          // undefined

function minMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
const { min, max } = minMax([4, 9, 1, 7]);
console.log(min, max);

// Fungsi yang mengembalikan fungsi (closure)
function pengali(x) {
  return (y) => x * y;
}
const kaliTiga = pengali(3);
console.log(kaliTiga(5));            // 15

// Return awal sebagai validasi
function bagi(a, b) {
  if (b === 0) return "Tidak bisa dibagi nol";
  return a / b;
}
console.log(bagi(10, 2), bagi(1, 0));
