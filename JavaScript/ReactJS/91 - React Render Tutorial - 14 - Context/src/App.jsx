import { ThemeProvider } from "./ThemeContext";
import Tombol from "./Tombol";

export default function App() {
  return (
    <ThemeProvider>
      <p>Saat nilai context berubah, semua komponen yang memakainya render ulang.</p>
      <Tombol />
    </ThemeProvider>
  );
}
