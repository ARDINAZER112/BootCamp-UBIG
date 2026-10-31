import { useState, useEffect } from "react";

export default function Latihan() {
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Pertanyaan: kenapa pakai setN((x) => x + 1)? Kapan cleanup berjalan?
  return <p>Latihan: {n}</p>;
}
