import ParentComp from "./ParentComp";

export default function App() {
  return (
    <div>
      <p>Klik tombol: Parent render tiap klik, MemoComp hanya sekali.</p>
      <ParentComp />
    </div>
  );
}
