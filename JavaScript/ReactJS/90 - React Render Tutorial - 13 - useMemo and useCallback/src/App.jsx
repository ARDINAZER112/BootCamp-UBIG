import Induk from "./Induk";

export default function App() {
  return (
    <div>
      <p>Ketik di input: Anak tidak render ulang berkat useCallback + memo.</p>
      <Induk />
    </div>
  );
}
