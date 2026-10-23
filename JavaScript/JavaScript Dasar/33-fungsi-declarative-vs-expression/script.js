console.log(declaration(2));            // jalan: hoisted
function declaration(x) { return x * 2; }

// console.log(expression(2));          // Error: Cannot access before initialization
const expression = function (x) { return x * 2; };
console.log(expression(2));

const arrow = (x) => x * 2;             // return implisit
console.log(arrow(2));

// Arrow dengan beberapa baris & tanpa/dengan banyak parameter
const hitung = (a, b) => {
  const jumlah = a + b;
  return jumlah * 2;
};
console.log(hitung(1, 2));

// IIFE
(function () { console.log("Langsung dijalankan"); })();

// Callback: fungsi sebagai argumen
function ulangi(n, aksi) { for (let i = 0; i < n; i++) aksi(i); }
ulangi(3, (i) => console.log("ke-", i));
