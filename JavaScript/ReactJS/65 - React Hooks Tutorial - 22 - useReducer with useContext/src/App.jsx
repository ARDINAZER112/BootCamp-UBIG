import { CountProvider } from "./CountContext";
import ComponentA from "./ComponentA";

export default function App() {
  return (
    <CountProvider>
      <p>Dua komponen memakai state yang sama lewat context.</p>
      <ComponentA nama="Komponen A" />
      <ComponentA nama="Komponen B" />
    </CountProvider>
  );
}
