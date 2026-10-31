let nama = "Arcana";
nama = "Therzevena";          // boleh diubah
const PI = 3.14159;
// PI = 3;                    // Error: Assignment to constant variable
var lama = "hindari var";

console.log(nama, PI, lama);

// const pada objek/array: isinya boleh berubah, referensinya tidak
const user = { nama: "A" };
user.nama = "B";
console.log(user);

// camelCase
let namaLengkapPengguna = "Budi Santoso";
console.log(namaLengkapPengguna);
