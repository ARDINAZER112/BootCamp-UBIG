const umur = 20;
const status = umur >= 17 ? "Dewasa" : "Anak";
console.log(status);

// Dalam template literal
const stok = 0;
console.log(`Stok: ${stok > 0 ? "Tersedia" : "Habis"}`);

// Bersarang (gunakan seperlunya)
const n = 0;
console.log(n > 0 ? "positif" : n < 0 ? "negatif" : "nol");

// Setara dengan:
let s;
if (umur >= 17) { s = "Dewasa"; } else { s = "Anak"; }
console.log(s);
