const nama = "Arcana", harga = 15000, qty = 3;

console.log(`Halo, ${nama}!`);
console.log(`Total: Rp ${(harga * qty).toLocaleString("id-ID")}`);
console.log(`Status: ${qty > 2 ? "grosir" : "eceran"}`);

// Multiline
const html = `
<div class="kartu">
  <h2>${nama}</h2>
</div>`;
console.log(html);

// Menyisipkan backtick / ${ } literal
console.log(`Backtick: \` dan \${tidakDievaluasi}`);

// Tagged template
function tebal(strings, ...nilai) {
  return strings.reduce((hasil, s, i) => hasil + s + (nilai[i] !== undefined ? `<b>${nilai[i]}</b>` : ""), "");
}
console.log(tebal`Nama: ${nama}, umur: ${20}`);

// Menjalankan fungsi di dalam
const daftar = ["apel", "jeruk"];
console.log(`Buah: ${daftar.map(b => b.toUpperCase()).join(", ")}`);
