import { ThemeContextProvider } from "./ThemeContext";
import Box from "./Box";

export default function App() {
  return (
    <ThemeContextProvider>
      <Box />
    </ThemeContextProvider>
  );
}
