import { useState } from "react";

export default function HookPertama() {
  const [nama, setNama] = useState("Ardi");
  return (
    <button onClick={() => setNama("Budi")}>
      Halo {nama}
    </button>
  );
}
