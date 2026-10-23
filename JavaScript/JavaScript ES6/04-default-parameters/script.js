function sapa(nama = "Tamu", sapaan = "Halo") {
  return `${sapaan}, ${nama}!`;
}
console.log(sapa());
console.log(sapa("Arcana"));
console.log(sapa("Arcana", "Selamat pagi"));
console.log(sapa(undefined, "Hai"));   // undefined -> pakai default
console.log(sapa(null));               // null TIDAK memicu default

// Pola lama bermasalah untuk 0
function lama(n) { n = n || 10; return n; }
function baru(n = 10) { return n; }
console.log(lama(0), baru(0));         // 10 0

// Default boleh memakai parameter sebelumnya & fungsi
function persegi(p, l = p) { return p * l; }
console.log(persegi(4), persegi(4, 5));

const waktu = () => "sekarang";
function log(pesan, t = waktu()) { return `[${t}] ${pesan}`; }
console.log(log("mulai"));

// Dikombinasi dengan destructuring
function buatUser({ nama = "anon", role = "user" } = {}) {
  return `${nama} (${role})`;
}
console.log(buatUser(), buatUser({ nama: "A" }));
