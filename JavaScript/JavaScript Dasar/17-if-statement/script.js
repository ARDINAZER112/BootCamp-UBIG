const umur = 18;

if (umur >= 17) {
  console.log("Boleh membuat KTP");
} else {
  console.log("Belum cukup umur");
}

// if bersarang
const login = true, admin = false;
if (login) {
  if (admin) console.log("Panel admin");
  else console.log("Halaman user");
}

// Truthy / falsy
const nama = "";
if (nama) console.log("Ada nama");
else console.log("Nama kosong");

// Guard clause (early return) agar kode tidak bersarang dalam
function sapa(n) {
  if (!n) return "Siapa kamu?";
  return `Halo ${n}`;
}
console.log(sapa(""), sapa("Arcana"));
