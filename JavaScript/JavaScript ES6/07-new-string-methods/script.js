const s = "JavaScript ES6";

console.log(s.startsWith("Java"));          // true
console.log(s.startsWith("Script", 4));     // true (mulai dari indeks 4)
console.log(s.endsWith("ES6"));             // true
console.log(s.includes("Script"));          // true (pengganti indexOf !== -1)

console.log("ha".repeat(3));                // hahaha
console.log("5".padStart(3, "0"));          // 005
console.log("Hi".padEnd(6, "."));           // Hi....

console.log("  spasi  ".trimStart() + "|");
console.log("|" + "  spasi  ".trimEnd());

console.log("a-b-c".replaceAll("-", "+"));  // a+b+c
console.log(s.at(-1));                      // 6

// Contoh praktis: format jam 07:05
const jam = 7, menit = 5;
console.log(`${String(jam).padStart(2, "0")}:${String(menit).padStart(2, "0")}`);
