import { useState } from "react";
import LifecycleDemo from "./LifecycleDemo";

export default function App() {
  const [tampil, setTampil] = useState(true);

  return (
    <div>
      <p>Buka console browser, lalu klik tombol untuk melihat urutan lifecycle.</p>
      <button onClick={() => setTampil(!tampil)}>
        {tampil ? "Unmount komponen" : "Mount komponen"}
      </button>
      <div>{tampil && <LifecycleDemo />}</div>
    </div>
  );
}
