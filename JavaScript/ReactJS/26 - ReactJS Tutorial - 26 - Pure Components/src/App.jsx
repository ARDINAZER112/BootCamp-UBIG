import ParentComp from "./ParentComp";

export default function App() {
  return (
    <div>
      <p>Lihat console: RegComp ikut render tiap 2 detik, PureComp tidak.</p>
      <ParentComp />
    </div>
  );
}
