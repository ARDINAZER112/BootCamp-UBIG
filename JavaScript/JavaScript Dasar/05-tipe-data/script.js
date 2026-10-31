console.log(typeof "teks");        // string
console.log(typeof 42);            // number
console.log(typeof true);          // boolean
console.log(typeof undefined);     // undefined
console.log(typeof null);          // object (keanehan historis JS)
console.log(typeof {});            // object
console.log(typeof []);            // object (cek array: Array.isArray)
console.log(Array.isArray([]));    // true
console.log(typeof function(){});  // function
console.log(typeof 10n);           // bigint

let x = 5;
x = "sekarang string";             // tipe berubah bebas
console.log(typeof x);
