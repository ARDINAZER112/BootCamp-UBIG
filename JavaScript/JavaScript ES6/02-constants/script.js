const PI = 3.14159;
// PI = 3;                // TypeError: Assignment to constant variable
// const kosong;          // SyntaxError: wajib langsung diisi

const user = { nama: "Arcana", umur: 20 };
user.umur = 21;           // boleh: isi objek berubah
console.log(user);
// user = {};              // TypeError: referensi tidak boleh diganti

const list = [1, 2];
list.push(3);             // boleh
console.log(list);

// Membekukan objek
const beku = Object.freeze({ a: 1, nested: { b: 2 } });
beku.a = 99;              // diabaikan (strict mode: error)
beku.nested.b = 99;       // freeze hanya dangkal, ini tetap berubah
console.log(beku);

// const di dalam block
if (true) {
  const lokal = "di blok";
  console.log(lokal);
}
// console.log(lokal);     // ReferenceError
