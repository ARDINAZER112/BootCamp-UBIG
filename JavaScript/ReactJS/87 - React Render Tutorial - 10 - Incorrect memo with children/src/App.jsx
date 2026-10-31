import { useState } from "react";
import Wrapper from "./Wrapper";

export default function App() {
  const [tick, setTick] = useState(0);

  return (
    <div>
      <button onClick={() => setTick(tick + 1)}>Parent render ({tick})</button>
      <p>Wrapper dibungkus memo, tapi jumlah render tetap naik karena children JSX adalah elemen baru tiap render.</p>
      <Wrapper>
        <span>Isi</span>
      </Wrapper>
    </div>
  );
}
