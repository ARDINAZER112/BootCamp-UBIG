let i = 1;
while (i <= 5) {
  console.log("i =", i);
  i++;
}

// Hitung berapa kali bisa dibagi 2 sampai < 1
let n = 100, hitung = 0;
while (n >= 1) { n /= 2; hitung++; }
console.log(hitung);

// Pakai while untuk jumlah digit
let angka = 12345, jumlah = 0;
while (angka > 0) {
  jumlah += angka % 10;
  angka = Math.floor(angka / 10);
}
console.log(jumlah);   // 15
