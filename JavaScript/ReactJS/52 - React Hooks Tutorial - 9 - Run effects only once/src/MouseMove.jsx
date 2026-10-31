import { useState, useEffect } from "react";

export default function MouseMove() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("Effect dipasang sekali");
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
  }, []);

  return <p>X: {pos.x} Y: {pos.y}</p>;
}
