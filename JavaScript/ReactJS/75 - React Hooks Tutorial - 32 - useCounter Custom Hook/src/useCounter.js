import { useState } from "react";

export default function useCounter(initialCount = 0, value = 1) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((c) => c + value);
  const decrement = () => setCount((c) => c - value);
  const reset = () => setCount(initialCount);

  return [count, increment, decrement, reset];
}
