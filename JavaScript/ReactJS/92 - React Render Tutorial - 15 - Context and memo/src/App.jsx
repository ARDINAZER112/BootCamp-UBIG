import { ThemeProvider } from "./ThemeContext";
import { TidakPakaiContext, PakaiContext } from "./Komponen";

export default function App() {
  return (
    <ThemeProvider>
      <p>memo tidak memblokir render dari context, tapi melindungi komponen yang tidak memakainya.</p>
      <PakaiContext />
      <TidakPakaiContext />
    </ThemeProvider>
  );
}
