import { useState } from "react";

export default function Counter({ render }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return render(count, increment);
}
