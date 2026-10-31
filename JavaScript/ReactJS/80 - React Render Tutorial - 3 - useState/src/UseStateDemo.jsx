import { useState } from "react";
import useRenderCount from "./useRenderCount";

export default function UseStateDemo() {
  const [count, setCount] = useState(0);
  const renders = useRenderCount();

  return (
    <div>
      <p>Count: {count} | Render: {renders}</p>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
      <button onClick={() => setCount(count)}>Set nilai sama</button>
    </div>
  );
}
