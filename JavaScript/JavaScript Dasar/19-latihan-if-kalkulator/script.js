const angka1 = document.getElementById("angka1");
const angka2 = document.getElementById("angka2");
const operasi = document.getElementById("operasi");
const hasil = document.getElementById("hasil");

document.getElementById("hitung").addEventListener("click", () => {
  const a = parseFloat(angka1.value);
  const b = parseFloat(angka2.value);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    hasil.textContent = "Masukkan angka yang valid!";
    return;
  }

  let h;
  switch (operasi.value) {
    case "+": h = a + b; break;
    case "-": h = a - b; break;
    case "*": h = a * b; break;
    case "/":
      if (b === 0) { hasil.textContent = "Tidak bisa dibagi nol!"; return; }
      h = a / b; break;
    default: h = "Operasi tidak dikenal";
  }
  hasil.textContent = `Hasil: ${h}`;
});
