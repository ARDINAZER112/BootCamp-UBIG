const a = [1, 2, 3];
const b = [4, 5];

console.log([...a, ...b]);              // [1,2,3,4,5]
console.log([0, ...a, 99]);             // sisip di mana saja

const salinan = [...a];
salinan.push(100);
console.log(a, salinan);                // a tidak berubah

console.log(Math.max(...a, ...b));      // 5
console.log([..."halo"]);               // ["h","a","l","o"]

// Objek
const dasar = { nama: "A", umur: 20 };
const lengkap = { ...dasar, umur: 21, kota: "Tuban" };  // timpa & tambah
console.log(lengkap);

// Update objek tanpa mutasi (pola umum di React)
const state = { count: 1, user: "A" };
const stateBaru = { ...state, count: state.count + 1 };
console.log(state, stateBaru);

// Rest parameter (kebalikannya)
function jumlah(pertama, ...sisa) {
  return pertama + sisa.reduce((x, y) => x + y, 0);
}
console.log(jumlah(1, 2, 3, 4));

// Rest di destructuring
const [x, ...lainnya] = [10, 20, 30];
console.log(x, lainnya);

// Catatan: salinan dangkal
const nested = { a: { b: 1 } };
const s = { ...nested };
s.a.b = 99;
console.log(nested.a.b);                // 99 (objek dalam masih berbagi referensi)
