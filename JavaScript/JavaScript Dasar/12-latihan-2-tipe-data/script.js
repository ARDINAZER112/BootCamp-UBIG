// 1. Ubah input string jadi angka dan jumlahkan
const input1 = "15", input2 = "27";
console.log(Number(input1) + Number(input2));     // 42 (bukan "1527")

// 2. Validasi: apakah input angka valid?
function adalahAngka(v) {
  return v !== "" && !Number.isNaN(Number(v));
}
console.log(adalahAngka("12"), adalahAngka("12a"), adalahAngka(""));

// 3. Cek tipe beberapa nilai
const nilai = ["teks", 7, true, null, undefined, [], {}, NaN];
for (const n of nilai) console.log(n, "->", typeof n);

// 4. TODO: hitung luas lingkaran r = "7" dengan 2 desimal
const r = "7";
const luas = (Math.PI * Number(r) ** 2).toFixed(2);
console.log("Luas:", luas);                         // 153.94

// 5. TODO: ubah 36.6 derajat Celsius ke Fahrenheit
console.log((36.6 * 9) / 5 + 32);
