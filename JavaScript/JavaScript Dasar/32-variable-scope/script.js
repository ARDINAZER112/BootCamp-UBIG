const global = "saya global";

function uji() {
  const lokal = "saya lokal";
  console.log(global, lokal);       // keduanya terlihat
}
uji();
// console.log(lokal);               // ReferenceError

if (true) {
  let dalamBlok = "let di blok";
  var bocor = "var bocor keluar blok";
}
console.log(bocor);
// console.log(dalamBlok);            // ReferenceError

// Hoisting
console.log(a);                      // undefined (var di-hoist)
var a = 5;
// console.log(b);                    // ReferenceError (TDZ)
let b = 5;

// Closure: fungsi mengingat scope tempat dibuat
function counter() {
  let n = 0;
  return () => ++n;
}
const c = counter();
console.log(c(), c(), c());          // 1 2 3

// Masalah klasik var di loop vs let
const f1 = [], f2 = [];
for (var i = 0; i < 3; i++) f1.push(() => i);
for (let j = 0; j < 3; j++) f2.push(() => j);
console.log(f1.map(f => f()), f2.map(f => f())); // [3,3,3] [0,1,2]
