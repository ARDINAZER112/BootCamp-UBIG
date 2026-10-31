import { useState, useRef, useEffect } from "react";

export default function MutableRef() {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const stop = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => setTimer((t) => t + 1), 1000);
    return () => stop();
  }, []);

  return (
    <div>
      Timer: {timer} <button onClick={stop}>Stop</button>
    </div>
  );
}
