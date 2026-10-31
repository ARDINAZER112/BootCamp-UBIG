import { DenganUseState, DenganUseReducer } from "./Perbandingan";

export default function App() {
  return (
    <div>
      <p>Hasil sama. Pilih useReducer kalau state berstruktur dan transisinya banyak.</p>
      <DenganUseState />
      <DenganUseReducer />
    </div>
  );
}
