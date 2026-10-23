let a = 1;
a = 2;
// let a = 3;              // SyntaxError: sudah dideklarasikan
console.log(a);

if (true) {
  let b = "dalam blok";
  var c = "var bocor";
}
console.log(c);
// console.log(b);          // ReferenceError

// Temporal dead zone
// console.log(x);           // ReferenceError (bukan undefined)
let x = 10;

// Masalah klasik closure di loop
const pakaiVar = [], pakaiLet = [];
for (var i = 0; i < 3; i++) pakaiVar.push(() => i);
for (let j = 0; j < 3; j++) pakaiLet.push(() => j);
console.log(pakaiVar.map(f => f()));   // [3, 3, 3]
console.log(pakaiLet.map(f => f()));   // [0, 1, 2]

// Shadowing
let nama = "luar";
{ let nama = "dalam"; console.log(nama); }
console.log(nama);
