import useToggle from "./useToggle";

function Lampu() {
  const [nyala, toggle] = useToggle(false);
  return <button onClick={toggle}>Lampu {nyala ? "menyala" : "mati"}</button>;
}

function Detail() {
  const [tampil, toggle] = useToggle(false);
  return (
    <div>
      <button onClick={toggle}>{tampil ? "Sembunyikan" : "Tampilkan"} detail</button>
      {tampil && <p>Logika yang sama dipakai di dua komponen berbeda.</p>}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Lampu />
      <Detail />
    </div>
  );
}
