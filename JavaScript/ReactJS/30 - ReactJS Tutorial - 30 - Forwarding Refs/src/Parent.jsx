import { useRef } from "react";
import FRInput from "./FRInput";

export default function Parent() {
  const inputRef = useRef(null);
  return (
    <>
      <FRInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Fokus</button>
    </>
  );
}
