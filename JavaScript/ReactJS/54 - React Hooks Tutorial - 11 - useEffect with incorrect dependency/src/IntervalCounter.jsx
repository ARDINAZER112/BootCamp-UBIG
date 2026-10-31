import { useState, useEffect } from "react";

// SALAH: effect memegang nilai `count` lama (selalu 0), jadi hasilnya mentok di 1
export function Salah() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(id);
  }, []); // count tidak ada di dependency

  return <h2>Salah: {count}</h2>;
}

// BENAR: pakai bentuk fungsi, tidak butuh `count` di dependency
export function Benar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <h2>Benar: {count}</h2>;
}
