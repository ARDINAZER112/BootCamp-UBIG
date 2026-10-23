const kuadrat = x => x * x;
const tambah = (a, b) => a + b;
const sapa = () => "Halo";
const banyakBaris = (a, b) => {
  const hasil = a + b;
  return hasil * 2;
};
const objek = id => ({ id, aktif: true });   // kurung untuk return objek
console.log(kuadrat(4), tambah(1, 2), sapa(), banyakBaris(1, 2), objek(7));

// Dengan array method
const angka = [1, 2, 3, 4];
console.log(angka.map(n => n * 2).filter(n => n > 2));

// this leksikal
function Timer() {
  this.detik = 0;
  const tick = () => { this.detik++; };    // this = instance Timer
  tick(); tick();
}
console.log(new Timer().detik);            // 2

const obj = {
  nama: "A",
  benar() { return this.nama; },           // method biasa: this = obj
  salah: () => typeof this,                // arrow: this dari luar (bukan obj)
  delay() { setTimeout(() => console.log("timeout:", this.nama), 0); }
};
console.log(obj.benar());
obj.delay();

// Tidak bisa jadi constructor
const A = () => {};
try { new A(); } catch (e) { console.log(e.constructor.name); }  // TypeError
