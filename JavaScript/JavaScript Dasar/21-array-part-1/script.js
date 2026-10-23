const buah = ["apel", "jeruk", "mangga"];
console.log(buah[0], buah.length, buah.at(-1));

buah.push("pisang");        // tambah di belakang
buah.unshift("anggur");     // tambah di depan
console.log(buah);

console.log(buah.pop());    // hapus belakang -> pisang
console.log(buah.shift());  // hapus depan -> anggur
console.log(buah);

buah[1] = "melon";          // ubah elemen
console.log(buah);

console.log(buah.indexOf("mangga"), buah.includes("kiwi"));
console.log(Array.isArray(buah));

// Array bisa campuran & bersarang
const campur = [1, "dua", true, [4, 5]];
console.log(campur[3][1]);  // 5
