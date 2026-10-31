import { createContext, useState } from "react";
import useRenderCount from "./useRenderCount";

export const CountContext = createContext();

export function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  const renders = useRenderCount();

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <p>Provider render: {renders}</p>
      {children} {/* referensi sama -> tidak ikut render */}
    </CountContext.Provider>
  );
}
