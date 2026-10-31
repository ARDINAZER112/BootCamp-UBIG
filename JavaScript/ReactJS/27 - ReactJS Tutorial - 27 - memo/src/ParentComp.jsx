import { useState } from "react";
import MemoComp from "./MemoComp";

export default function ParentComp() {
  const [count, setCount] = useState(0);
  console.log("Parent render");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Parent count: {count}</button>
      <MemoComp nama="Ardi" />
    </div>
  );
}
