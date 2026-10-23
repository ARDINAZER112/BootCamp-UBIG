let i = 10;
do {
  console.log("Tetap jalan sekali, i =", i);
  i++;
} while (i < 5);

// Perbandingan dengan while: while tidak akan jalan sama sekali
let j = 10;
while (j < 5) { console.log("tidak pernah tampil"); }

// Simulasi: ulangi sampai dapat angka > 8
let angka;
do {
  angka = Math.floor(Math.random() * 10) + 1;
  console.log("Angka:", angka);
} while (angka <= 8);
