// Proyek: Keranjang Belanja
// Menggabungkan: variabel, array, objek, fungsi, if/else, loop, DOM.
const produk = [
  { id: 1, nama: "Buku Tulis", harga: 5000 },
  { id: 2, nama: "Pensil", harga: 2500 },
  { id: 3, nama: "Penghapus", harga: 1500 },
  { id: 4, nama: "Penggaris", harga: 4000 },
];
let keranjang = [];                         // { id, jumlah }

const elProduk = document.getElementById("produk");
const elKeranjang = document.getElementById("keranjang");
const elTotal = document.getElementById("total");
const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");

function tambah(id) {
  const item = keranjang.find((k) => k.id === id);
  if (item) item.jumlah++;
  else keranjang.push({ id, jumlah: 1 });
  render();
}

function kurang(id) {
  const idx = keranjang.findIndex((k) => k.id === id);
  if (idx === -1) return;
  keranjang[idx].jumlah--;
  if (keranjang[idx].jumlah <= 0) keranjang.splice(idx, 1);
  render();
}

function hitungTotal() {
  let total = 0;
  for (const k of keranjang) {
    const p = produk.find((x) => x.id === k.id);
    total += p.harga * k.jumlah;
  }
  return total;
}

function renderProduk() {
  elProduk.innerHTML = "";
  for (const p of produk) {
    const li = document.createElement("li");
    li.textContent = `${p.nama} - ${rupiah(p.harga)} `;
    const b = document.createElement("button");
    b.textContent = "+ Tambah";
    b.addEventListener("click", () => tambah(p.id));
    li.appendChild(b);
    elProduk.appendChild(li);
  }
}

function render() {
  elKeranjang.innerHTML = "";
  if (keranjang.length === 0) {
    elKeranjang.innerHTML = "<li><em>Keranjang kosong</em></li>";
  }
  for (const k of keranjang) {
    const p = produk.find((x) => x.id === k.id);
    const li = document.createElement("li");
    li.textContent = `${p.nama} x${k.jumlah} = ${rupiah(p.harga * k.jumlah)} `;
    const b = document.createElement("button");
    b.textContent = "-";
    b.addEventListener("click", () => kurang(k.id));
    li.appendChild(b);
    elKeranjang.appendChild(li);
  }
  const total = hitungTotal();
  const diskon = total >= 20000 ? total * 0.1 : 0;      // diskon 10% jika >= 20.000
  elTotal.textContent = diskon
    ? `Total ${rupiah(total)} - diskon ${rupiah(diskon)} = ${rupiah(total - diskon)}`
    : `Total ${rupiah(total)}`;
}

renderProduk();
render();
