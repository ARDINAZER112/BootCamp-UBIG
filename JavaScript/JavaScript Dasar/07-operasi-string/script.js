const s = "  Belajar JavaScript  ";
console.log(s.length);
console.log(s.trim());
const t = s.trim();
console.log(t.toUpperCase(), t.toLowerCase());
console.log(t.indexOf("Java"));     // 8
console.log(t.includes("Script"));  // true
console.log(t.startsWith("Bel"), t.endsWith("pt"));
console.log(t.slice(0, 7));         // Belajar
console.log(t.slice(-6));           // Script
console.log(t.replace("Belajar", "Kuasai"));
console.log(t.split(" "));          // ["Belajar","JavaScript"]
console.log(t.charAt(0), t[1]);
console.log("ab".repeat(3));
console.log("7".padStart(3, "0"));  // 007

// Penyambungan
console.log("Halo" + " " + "Dunia");
