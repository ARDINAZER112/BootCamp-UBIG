import { useState } from "react";
import { Statis, Dinamis } from "./Contoh";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, nama: "Bruce" },
    { id: 2, nama: "Clark" },
    { id: 3, nama: "Diana" },
  ]);

  return (
    <div>
      <h2>Index sebagai key (aman: list statis)</h2>
      <ul><Statis /></ul>

      <h2>Id sebagai key (list dinamis)</h2>
      <button onClick={() => setItems([...items].reverse())}>Balik urutan</button>
      <ul><Dinamis items={items} /></ul>
    </div>
  );
}
