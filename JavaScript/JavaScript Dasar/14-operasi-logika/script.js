console.log(true && false, true || false, !true);

const umur = 20, punyaKTP = true;
console.log(umur >= 17 && punyaKTP);

// Short-circuit untuk nilai default
const nama = "" || "Tamu";
console.log(nama);                // Tamu
const skor = 0 ?? 100;
console.log(skor);                // 0 (?? tidak mengganti 0)
const skor2 = 0 || 100;
console.log(skor2);               // 100

// Eksekusi bersyarat
const login = true;
login && console.log("Selamat datang!");

// Tabel kebenaran
for (const a of [true, false])
  for (const b of [true, false])
    console.log(a, b, "AND:", a && b, "OR:", a || b);
