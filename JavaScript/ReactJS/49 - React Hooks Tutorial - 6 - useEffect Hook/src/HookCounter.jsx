import { useState, useEffect } from "react";

export default function HookCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Diklik ${count} kali`;
  });

  return <button onClick={() => setCount(count + 1)}>Klik {count} (lihat judul tab)</button>;
}
