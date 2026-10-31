import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("terang");
  return (
    <ThemeContext.Provider value={{ tema, setTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTema = () => useContext(ThemeContext);
