let tugas = [
  { teks: "Belajar JavaScript", selesai: false },
  { teks: "Latihan looping", selesai: false },
];

const input = document.getElementById("input");
const daftar = document.getElementById("daftar");

function render() {
  daftar.innerHTML = "";                          // kosongkan
  tugas.forEach((t, i) => {                       // loop array
    const li = document.createElement("li");
    li.textContent = t.teks;
    if (t.selesai) li.classList.add("selesai");
    li.addEventListener("click", () => { t.selesai = !t.selesai; render(); });

    const hapus = document.createElement("button");
    hapus.textContent = "Hapus";
    hapus.className = "hapus";
    hapus.addEventListener("click", (e) => {
      e.stopPropagation();
      tugas.splice(i, 1);
      render();
    });

    li.appendChild(hapus);
    daftar.appendChild(li);
  });
}

document.getElementById("tambah").addEventListener("click", () => {
  const teks = input.value.trim();
  if (!teks) return;
  tugas.push({ teks, selesai: false });
  input.value = "";
  render();
});

render();
