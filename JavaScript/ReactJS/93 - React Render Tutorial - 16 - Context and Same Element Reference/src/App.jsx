import { CountProvider } from "./CountProvider";
import Berat from "./Berat";
import Tombol from "./Tombol";

export default function App() {
  return (
    <CountProvider>
      <Berat />   {/* tidak render ulang */}
      <Tombol />  {/* memakai context -> render ulang */}
    </CountProvider>
  );
}
