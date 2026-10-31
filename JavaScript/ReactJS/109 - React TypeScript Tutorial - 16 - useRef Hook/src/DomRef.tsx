import { useRef, useEffect } from "react";

export default function DomRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input type="text" ref={inputRef} placeholder="Otomatis fokus" />;
}
