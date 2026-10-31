for (let i = 1; i <= 5; i++) {
  console.log("Iterasi", i);
}

// Mundur & loncat
for (let i = 10; i >= 0; i -= 5) console.log(i);   // 10 5 0

// Total 1..100
let total = 0;
for (let i = 1; i <= 100; i++) total += i;
console.log(total);                                // 5050

// for...of dan for...in
for (const b of ["apel", "jeruk"]) console.log(b);
for (const k in { x: 1, y: 2 }) console.log(k);

// Loop bersarang: pola segitiga
for (let i = 1; i <= 4; i++) {
  let baris = "";
  for (let j = 1; j <= i; j++) baris += "*";
  console.log(baris);
}

// Tabel perkalian 3
for (let i = 1; i <= 5; i++) console.log(`3 x ${i} = ${3 * i}`);
