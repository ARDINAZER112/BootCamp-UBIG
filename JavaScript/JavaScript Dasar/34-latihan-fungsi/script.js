// 1. Faktorial (iteratif dan rekursif)
function faktorial(n) { let h = 1; for (let i = 2; i <= n; i++) h *= i; return h; }
const faktorialRek = (n) => (n <= 1 ? 1 : n * faktorialRek(n - 1));
console.log(faktorial(5), faktorialRek(5));            // 120 120

// 2. Palindrom
function palindrom(s) {
  const bersih = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return bersih === bersih.split("").reverse().join("");
}
console.log(palindrom("Katak"), palindrom("A man, a plan, a canal: Panama"), palindrom("halo"));

// 3. Rata-rata
const rata = (...n) => n.reduce((a, b) => a + b, 0) / n.length;
console.log(rata(80, 90, 70));

// 4. FizzBuzz
for (let i = 1; i <= 15; i++) {
  console.log(i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : i);
}

// 5. Hitung vokal
function vokal(s) {
  let n = 0;
  for (const c of s.toLowerCase()) if ("aiueo".includes(c)) n++;
  return n;
}
console.log(vokal("Belajar JavaScript"));

// 6. Bilangan prima
function prima(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
console.log([1, 2, 7, 10, 13].filter(prima));
