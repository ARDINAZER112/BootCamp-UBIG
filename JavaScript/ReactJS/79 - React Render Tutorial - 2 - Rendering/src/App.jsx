import { useState } from "react";
import Render from "./Render";

export default function App() {
  const [tick, setTick] = useState(0);

  return (
    <div>
      <p>
        Render phase: fungsi komponen dipanggil. Commit phase: perbedaan diterapkan ke DOM.
        Render tidak selalu berarti DOM berubah.
      </p>
      <button onClick={() => setTick(tick + 1)}>Render ulang parent ({tick})</button>
      <Render />
    </div>
  );
}
