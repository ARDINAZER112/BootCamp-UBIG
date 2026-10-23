let a;
console.log(a);                  // undefined
const obj = {};
console.log(obj.tidakAda);       // undefined
function f() {}
console.log(f());                // undefined

let b = null;                    // sengaja kosong
console.log(b, typeof b);

console.log("abc" * 2);          // NaN
console.log(parseInt("halo"));   // NaN
console.log(NaN === NaN);        // false!
console.log(Number.isNaN(NaN), Number.isNaN("abc")); // true false
console.log(isNaN("abc"));       // true (isNaN global memaksa konversi, kurang akurat)

console.log(null == undefined, null === undefined); // true false
