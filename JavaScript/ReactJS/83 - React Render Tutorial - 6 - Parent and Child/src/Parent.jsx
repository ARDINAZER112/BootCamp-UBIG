import { useState } from "react";
import Child from "./Child";
import useRenderCount from "./useRenderCount";

export default function Parent() {
  const [count, setCount] = useState(0);
  const renders = useRenderCount();

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Parent: {count}</button>
      <p>Parent render: {renders}</p>
      <Child />
    </div>
  );
}
