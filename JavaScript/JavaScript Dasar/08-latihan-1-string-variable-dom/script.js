const inputNama = document.getElementById("nama");
const tombol = document.getElementById("tombol");
const hasil = document.getElementById("hasil");

tombol.addEventListener("click", function () {
  const nama = inputNama.value.trim();
  if (nama === "") {
    hasil.textContent = "Isi nama dulu ya!";
    return;
  }
  const kapital = nama.charAt(0).toUpperCase() + nama.slice(1).toLowerCase();
  hasil.textContent = `Halo, ${kapital}! Namamu punya ${nama.length} huruf.`;
});
