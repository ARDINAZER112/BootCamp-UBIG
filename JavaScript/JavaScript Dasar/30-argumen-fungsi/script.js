function sapa(nama, sapaan = "Halo") {
  console.log(`${sapaan}, ${nama}!`);
}
sapa("Arcana");
sapa("Budi", "Selamat pagi");
sapa();                       // nama = undefined

function jumlah(...angka) {   // rest parameter
  let total = 0;
  for (const n of angka) total += n;
  return total;
}
console.log(jumlah(1, 2, 3, 4));

// Argumen primitif disalin, objek disalin referensinya
function ubah(n, o) { n = 99; o.x = 99; }
let angka = 1; const obj = { x: 1 };
ubah(angka, obj);
console.log(angka, obj);      // 1 { x: 99 }
