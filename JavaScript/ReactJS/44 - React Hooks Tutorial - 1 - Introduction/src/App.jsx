import { useState } from "react";

export default function App() {
  const [n, setN] = useState(0);

  return (
    <div>
      <h1>Introduction ke React Hooks</h1>
      <p>Hooks adalah fungsi khusus (diawali <code>use</code>) yang memberi functional component state dan fitur React lain.</p>
      <h3>Aturan hooks</h3>
      <ol>
        <li>Panggil hanya di level teratas komponen (bukan di dalam if, loop, atau fungsi bersarang).</li>
        <li>Panggil hanya dari functional component atau custom hook.</li>
      </ol>
      <button onClick={() => setN(n + 1)}>Contoh hook pertama: {n}</button>
    </div>
  );
}
