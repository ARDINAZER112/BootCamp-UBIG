// 1. Kelulusan: nilai >= 70 dan kehadiran >= 75%
function lulus(nilai, hadir) { return nilai >= 70 && hadir >= 75; }
console.log(lulus(80, 90), lulus(80, 60), lulus(60, 90));

// 2. Tahun kabisat: habis dibagi 4 dan tidak 100, atau habis dibagi 400
function kabisat(th) { return (th % 4 === 0 && th % 100 !== 0) || th % 400 === 0; }
console.log(kabisat(2024), kabisat(1900), kabisat(2000));

// 3. Diskon: total >= 100000 dapat 10%
const total = 150000;
const bayar = total - (total >= 100000 ? total * 0.1 : 0);
console.log("Bayar:", bayar);

// 4. Konversi detik ke jam:menit:detik
const detik = 3725;
const jam = Math.floor(detik / 3600);
const menit = Math.floor((detik % 3600) / 60);
const sisa = detik % 60;
console.log(`${jam}j ${menit}m ${sisa}d`);

// 5. Rata-rata tiga nilai
const [a, b, c] = [80, 90, 75];
console.log(((a + b + c) / 3).toFixed(1));
