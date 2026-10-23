const nama = "Arcana", umur = 20;

// 1. Shorthand properti
const user = { nama, umur };
console.log(user);

// 2. Shorthand method
const kalkulator = {
  nilai: 0,
  tambah(n) { this.nilai += n; return this; },
  tampil() { console.log(this.nilai); }
};
kalkulator.tambah(5).tambah(3).tampil();

// 3. Computed property
const kunci = "warna";
const obj = {
  [kunci]: "biru",
  [`${kunci}Latar`]: "putih",
  ["id_" + 1]: 100
};
console.log(obj);

// Dipakai untuk update dinamis
function setField(field, nilai) { return { [field]: nilai }; }
console.log(setField("email", "a@b.com"));

// Destructuring
const { nama: n, umur: u, kota = "Tuban" } = user;
console.log(n, u, kota);
function cetak({ nama, umur }) { return `${nama} (${umur})`; }
console.log(cetak(user));

// Getter/setter dalam literal
const lingkaran = {
  r: 2,
  get luas() { return Math.PI * this.r ** 2; },
  set diameter(d) { this.r = d / 2; }
};
lingkaran.diameter = 10;
console.log(lingkaran.luas.toFixed(2));
