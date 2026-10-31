import { useState, useEffect } from "react";

export default function EffectLog() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect jalan setelah render. count =", count);
  });

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
