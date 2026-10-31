console.log(Boolean(0), Boolean(""), Boolean(null), Boolean(undefined), Boolean(NaN));
console.log(Boolean("0"), Boolean([]), Boolean({}), Boolean("false"));
console.log(!!"halo", !!0);

let nama = "";
if (!nama) console.log("Nama kosong (falsy)");

// Hasil perbandingan adalah boolean
console.log(5 > 3, 5 === "5");
