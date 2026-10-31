import { useState, useMemo, useCallback, memo } from "react";
import useRenderCount from "./useRenderCount";

const Anak = memo(function Anak({ onTambah }) {
  const renders = useRenderCount();
  console.log("Anak render");
  return <button onClick={onTambah}>Tambah (Anak render: {renders})</button>;
});

export default function Induk() {
  const [count, setCount] = useState(0);
  const [teks, setTeks] = useState("");

  const hasilBerat = useMemo(() => {
    let total = 0;
    for (let i = 0; i < 1_000_000; i++) total += i;
    return total + count;
  }, [count]);

  const tambah = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div>
      <input value={teks} onChange={(e) => setTeks(e.target.value)} placeholder="Ketik di sini" />
      <p>Hasil: {hasilBerat} (count: {count})</p>
      <Anak onTambah={tambah} />
    </div>
  );
}
