import { useState } from "react";
import Child from "./Child";

export default function Parent() {
  const [pesan, setPesan] = useState("Belum ada pesan");

  const sapa = (namaChild) => setPesan(`Halo dari ${namaChild}`);

  return (
    <div>
      <h2>{pesan}</h2>
      <Child sapaParent={sapa} />
    </div>
  );
}
