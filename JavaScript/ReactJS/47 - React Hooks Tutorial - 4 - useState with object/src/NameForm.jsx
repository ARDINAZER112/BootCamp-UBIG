import { useState } from "react";

export default function NameForm() {
  const [nama, setNama] = useState({ depan: "", belakang: "" });

  return (
    <form>
      <input
        value={nama.depan}
        onChange={(e) => setNama({ ...nama, depan: e.target.value })}
        placeholder="Nama depan"
      />
      <input
        value={nama.belakang}
        onChange={(e) => setNama({ ...nama, belakang: e.target.value })}
        placeholder="Nama belakang"
      />
      <p>{nama.depan} {nama.belakang}</p>
      <pre>{JSON.stringify(nama)}</pre>
    </form>
  );
}
