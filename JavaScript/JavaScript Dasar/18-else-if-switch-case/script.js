const nilai = 82;
let grade;
if (nilai >= 90) grade = "A";
else if (nilai >= 80) grade = "B";
else if (nilai >= 70) grade = "C";
else grade = "D";
console.log(grade);

const hari = 3;
switch (hari) {
  case 1: console.log("Senin"); break;
  case 2: console.log("Selasa"); break;
  case 3: console.log("Rabu"); break;
  default: console.log("Hari lain");
}

// Fall-through disengaja: beberapa case, satu aksi
const bulan = 2;
switch (bulan) {
  case 4: case 6: case 9: case 11:
    console.log("30 hari"); break;
  case 2:
    console.log("28/29 hari"); break;
  default:
    console.log("31 hari");
}
