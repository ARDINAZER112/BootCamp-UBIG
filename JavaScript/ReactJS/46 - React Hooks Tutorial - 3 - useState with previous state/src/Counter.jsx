import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const tambahLima = () => {
    for (let i = 0; i < 5; i++) {
      setCount((prev) => prev + 1); // benar: jadi +5
      // setCount(count + 1);       // salah: hanya +1
    }
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount((p) => p + 1)}>+1</button>
      <button onClick={tambahLima}>+5</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
