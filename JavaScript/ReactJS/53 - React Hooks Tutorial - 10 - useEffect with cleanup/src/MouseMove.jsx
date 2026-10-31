import { useState, useEffect } from "react";

export default function MouseMove() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);

    return () => {
      console.log("Cleanup: listener dilepas");
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <p>X: {pos.x} Y: {pos.y}</p>;
}
