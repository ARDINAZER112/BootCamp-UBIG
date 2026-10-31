// ===== ES5 vs ES6 =====
// 1. Variabel
var lama = "ES5";                 // function-scoped
let baru = "ES6";                 // block-scoped
const tetap = "ES6";              // tidak bisa di-assign ulang

// 2. Fungsi
var tambahLama = function (a, b) { return a + b; };
const tambahBaru = (a, b) => a + b;

// 3. String
var sapaLama = "Halo " + "Arcana" + "!";
const nama = "Arcana";
const sapaBaru = `Halo ${nama}!`;

// 4. Objek
var x = 1, y = 2;
var pLama = { x: x, y: y };
const pBaru = { x, y };

console.log(tambahLama(1, 2), tambahBaru(1, 2), sapaLama, sapaBaru, pLama, pBaru);
