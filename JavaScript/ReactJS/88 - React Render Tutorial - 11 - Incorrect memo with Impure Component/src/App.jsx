import { useState } from "react";
import { JamMemo, JamBiasa } from "./Jam";

export default function App() {
  const [tick, setTick] = useState(0);

  return (
    <div>
      <button onClick={() => setTick(tick + 1)}>Render ulang parent ({tick})</button>
      <p>Jam Biasa ikut berubah. Jam Memo tampil usang karena komponennya dilewati.</p>
      <JamBiasa />
      <JamMemo />
    </div>
  );
}
