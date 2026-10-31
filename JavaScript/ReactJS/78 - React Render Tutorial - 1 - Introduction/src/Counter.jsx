import { useState } from "react";
import useRenderCount from "./useRenderCount";

export default function Counter() {
  const [count, setCount] = useState(0);
  const renders = useRenderCount();

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <p>Jumlah render: {renders}</p>
    </div>
  );
}
