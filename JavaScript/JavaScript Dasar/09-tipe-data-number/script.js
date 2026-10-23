console.log(10, 3.14, -5, 1e3);
console.log(0.1 + 0.2);                    // 0.30000000000000004 (masalah floating point)
console.log((0.1 + 0.2).toFixed(2));       // "0.30"
console.log(Number("42"), parseInt("42px"), parseFloat("3.14abc"));
console.log(Number.MAX_SAFE_INTEGER);
console.log(1 / 0, -1 / 0);

console.log(Math.round(4.5), Math.floor(4.9), Math.ceil(4.1));
console.log(Math.max(1, 9, 3), Math.min(1, 9, 3));
console.log(Math.pow(2, 10), 2 ** 10, Math.sqrt(81), Math.abs(-7));
// Angka acak 1-10
console.log(Math.floor(Math.random() * 10) + 1);
console.log((255).toString(16), (5).toString(2));
