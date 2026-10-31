import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function App() {
  const [teks, setTeks] = useState("");

  return (
    <div>
      <Button handleClick={(e, id) => console.log("Klik", e.type, id)} />
      <Input value={teks} handleChange={(e) => setTeks(e.target.value)} />
      <p>Teks: {teks}</p>
    </div>
  );
}
