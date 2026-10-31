import { useState, useMemo } from "react";

export default function Counter() {
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);

  const isEven = useMemo(() => {
    let i = 0;
    while (i < 300_000_000) i++; // simulasi perhitungan lambat
    return one % 2 === 0;
  }, [one]);

  return (
    <div>
      <button onClick={() => setOne(one + 1)}>One: {one}</button>
      <span> {isEven ? "Genap" : "Ganjil"} </span>
      <button onClick={() => setTwo(two + 1)}>Two: {two}</button>
    </div>
  );
}
