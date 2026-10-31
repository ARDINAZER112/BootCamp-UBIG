import { useState } from "react";

export default function ItemList() {
  const [items, setItems] = useState([]);

  const tambah = () =>
    setItems([...items, { id: items.length, nilai: Math.floor(Math.random() * 10) + 1 }]);

  return (
    <div>
      <button onClick={tambah}>Tambah angka</button>
      <ul>
        {items.map((item) => <li key={item.id}>{item.nilai}</li>)}
      </ul>
    </div>
  );
}
