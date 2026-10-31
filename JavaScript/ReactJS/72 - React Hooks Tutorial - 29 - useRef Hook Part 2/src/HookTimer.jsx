import { useState, useEffect, useRef } from "react";

export default function HookTimer() {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      Timer: {timer}
      <button onClick={() => clearInterval(intervalRef.current)}>Stop</button>
    </div>
  );
}
