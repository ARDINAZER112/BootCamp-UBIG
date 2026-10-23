console.log(10 + 3, 10 - 3, 10 * 3, 10 / 3);
console.log(10 % 3);        // 1 (sisa bagi)
console.log(2 ** 3);        // 8
console.log(2 + 3 * 4, (2 + 3) * 4);

let x = 5;
x += 3; console.log(x);     // 8
x *= 2; console.log(x);     // 16
x++;    console.log(x);     // 17

// Pre vs post increment
let a = 5;
console.log(a++, a);        // 5 6
let b = 5;
console.log(++b, b);        // 6 6

// Perilaku tipe campuran
console.log("5" + 3, "5" - 3, "5" * "2");

// Genap/ganjil dengan modulus
console.log(7 % 2 === 0 ? "genap" : "ganjil");
