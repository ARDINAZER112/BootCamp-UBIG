import { useState } from "react";
import useRenderCount from "./useRenderCount";

export default function Counter({ children }) {
  const [count, setCount] = useState(0);
  const renders = useRenderCount();

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <p>Counter render: {renders}</p>
      {children} {/* referensi elemen sama -> tidak ikut render */}
    </div>
  );
}
