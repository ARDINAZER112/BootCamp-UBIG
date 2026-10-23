console.log(5 == "5", 5 === "5");
console.log(5 != "5", 5 !== "5");
console.log(0 == false, 0 === false);
console.log(null == undefined, null === undefined);
console.log(10 > 5, 10 <= 10);
console.log("apel" < "bola");        // true (urutan abjad)
console.log("10" < "9", 10 < 9);     // true false (string vs angka!)

console.log([1] === [1], {} === {}); // false false (referensi berbeda)
const a = [1]; const b = a;
console.log(a === b);                // true (referensi sama)
console.log(NaN === NaN);            // false
