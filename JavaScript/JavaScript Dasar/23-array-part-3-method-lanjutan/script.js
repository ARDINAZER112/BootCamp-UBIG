const angka = [5, 2, 9, 1, 7];

console.log(angka.map(n => n * 2));                 // [10,4,18,2,14]
console.log(angka.filter(n => n > 4));              // [5,9,7]
console.log(angka.reduce((total, n) => total + n, 0)); // 24
console.log(angka.find(n => n > 6));                // 9
console.log(angka.findIndex(n => n > 6));           // 2
console.log(angka.some(n => n > 8), angka.every(n => n > 0));

angka.forEach((n, i) => console.log(i, n));

console.log([10, 9, 1, 100].sort());                // [1,10,100,9] (string!)
console.log([10, 9, 1, 100].sort((a, b) => a - b)); // [1,9,10,100]
console.log([10, 9, 1, 100].sort((a, b) => b - a)); // menurun

const orang = [{ nama: "A", umur: 30 }, { nama: "B", umur: 20 }];
console.log(orang.sort((x, y) => x.umur - y.umur).map(o => o.nama));
console.log([1, 2, 3].reverse());
