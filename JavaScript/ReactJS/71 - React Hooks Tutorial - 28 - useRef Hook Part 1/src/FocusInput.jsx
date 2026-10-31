import { useRef, useEffect } from "react";

export default function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" placeholder="Otomatis fokus" />;
}
