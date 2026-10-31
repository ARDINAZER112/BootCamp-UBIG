const a = ["a", "b", "c", "d", "e"];
console.log(a.join("-"));          // a-b-c-d-e

console.log(a.slice(1, 3));        // ["b","c"]
console.log(a.slice(-2));          // ["d","e"]
console.log(a);                    // tidak berubah

const b = [1, 2, 3, 4, 5];
console.log(b.splice(1, 2));       // hapus 2 elemen mulai idx 1 -> [2,3]
console.log(b);                    // [1,4,5]
b.splice(1, 0, "x", "y");          // sisip tanpa menghapus
console.log(b);                    // [1,"x","y",4,5]
b.splice(0, 1, "satu");            // ganti elemen
console.log(b);

console.log([1, 2].concat([3, 4]), [...[1, 2], ...[3, 4]]);
