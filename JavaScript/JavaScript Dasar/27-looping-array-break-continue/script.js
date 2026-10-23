const angka = [3, 8, 12, 5, 20, 7];

for (let i = 0; i < angka.length; i++) console.log(i, angka[i]);
for (const n of angka) console.log(n);
for (const [i, n] of angka.entries()) console.log(i, n);

// continue: lewati angka ganjil
for (const n of angka) {
  if (n % 2 !== 0) continue;
  console.log("Genap:", n);
}

// break: berhenti di angka pertama > 10
for (const n of angka) {
  if (n > 10) { console.log("Ketemu:", n); break; }
}

// Label untuk keluar dari loop bersarang
luar:
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (i * j === 4) break luar;
    console.log(i, j);
  }
}
