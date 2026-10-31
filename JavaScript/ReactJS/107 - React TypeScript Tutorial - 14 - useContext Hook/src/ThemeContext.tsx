import { createContext } from "react";
import type { ReactNode } from "react";

export const theme = {
  primary: { main: "#3f51b5", text: "#ffffff" },
  secondary: { main: "#f50057", text: "#ffffff" },
};

type ThemeContextProviderProps = { children: ReactNode };

export const ThemeContext = createContext(theme);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
