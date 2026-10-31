import { useState, useEffect } from "react";

export default function HookCounter() {
  const [count, setCount] = useState(0);
  const [nama, setNama] = useState("");

  useEffect(() => {
    console.log("Memperbarui judul");
    document.title = `Diklik ${count} kali`;
  }, [count]); // tidak jalan saat hanya `nama` yang berubah

  return (
    <div>
      <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Ketik di sini" />
      <button onClick={() => setCount(count + 1)}>Klik {count}</button>
    </div>
  );
}
