import { useState } from "react";

export default function Immutability() {
  const [daftar, setDaftar] = useState(["a", "b"]);

  const salah = () => {
    daftar.push("c");       // mutasi: referensi sama, UI tidak berubah
    setDaftar(daftar);
    console.log("Isi array sebenarnya:", daftar);
  };

  const benar = () => setDaftar([...daftar, "c"]); // array baru

  return (
    <div>
      <button onClick={salah}>Salah (mutasi)</button>
      <button onClick={benar}>Benar (salin)</button>
      <button onClick={() => setDaftar(["a", "b"])}>Reset</button>
      <p>Tampilan: {daftar.join(", ")}</p>
    </div>
  );
}
