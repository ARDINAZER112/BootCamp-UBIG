function sapa() {
  console.log("Halo!");
}
sapa();
sapa();

// Fungsi yang membungkus logika berulang
function garis() {
  console.log("-".repeat(20));
}
garis();
console.log("Laporan");
garis();

// Fungsi bisa dipanggil sebelum didefinisikan (hoisting untuk declaration)
panggilNanti();
function panggilNanti() { console.log("Dipanggil sebelum definisi"); }
