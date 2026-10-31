import { useState, useMemo, useCallback } from "react";
import Child from "./Child";

export default function App() {
  const [count, setCount] = useState(0);

  // Stabil: referensi sama antar render
  const data = useMemo(() => ({ nama: "Ardi" }), []);
  const onKlik = useCallback(() => console.log("klik"), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Parent: {count}</button>
      {/* Props inline: referensi baru tiap render -> memo gagal */}
      <Child label="Inline" data={{ nama: "Ardi" }} onKlik={() => console.log("klik")} />
      {/* Props stabil: memo berhasil */}
      <Child label="Stabil" data={data} onKlik={onKlik} />
    </div>
  );
}
