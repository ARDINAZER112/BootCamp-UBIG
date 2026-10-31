import Contoh from "./Contoh";

const items = [
  { id: 1, nama: "Kopi", harga: 15000 },
  { id: 2, nama: "Teh", harga: 10000 },
];

export default function App() {
  return (
    <div>
      <h1>Debug React Apps</h1>
      <ol>
        <li>Console: <code>console.log</code>, <code>console.table</code>.</li>
        <li>React Developer Tools: lihat pohon komponen, props, state.</li>
        <li>Breakpoint di tab Sources, atau pernyataan <code>debugger;</code>.</li>
        <li>Debugger di VS Code (launch.json tipe chrome).</li>
      </ol>
      <Contoh items={items} />
    </div>
  );
}
