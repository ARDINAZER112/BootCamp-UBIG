import { useState } from "react";
import { Biasa, DenganMemo } from "./Children";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Parent: {count}</button>
      <Biasa nama="Ardi" />
      <DenganMemo nama="Ardi" />
    </div>
  );
}
