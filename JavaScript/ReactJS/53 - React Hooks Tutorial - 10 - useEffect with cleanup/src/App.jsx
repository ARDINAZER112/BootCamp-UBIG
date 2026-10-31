import { useState } from "react";
import MouseMove from "./MouseMove";

export default function App() {
  const [tampil, setTampil] = useState(true);

  return (
    <div>
      <button onClick={() => setTampil(!tampil)}>
        {tampil ? "Sembunyikan" : "Tampilkan"}
      </button>
      {tampil && <MouseMove />}
    </div>
  );
}
