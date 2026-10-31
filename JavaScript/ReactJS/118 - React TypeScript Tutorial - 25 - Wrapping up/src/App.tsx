const ringkasan = [
  "Props: tipe dasar, opsional, union, children, event, style.",
  "Hooks: useState, useReducer (action ketat), useContext, useRef.",
  "Class component dengan generik Component<P, S>.",
  "Teknik lanjutan: generic props, restricting props, template literal + Exclude, membungkus elemen HTML, mengekstrak tipe props, komponen polimorfik.",
];

export default function App() {
  return (
    <div>
      <h1>React TypeScript: Wrapping up</h1>
      <ul>
        {ringkasan.map((r) => <li key={r}>{r}</li>)}
      </ul>
      <p>Saran: buat proyek kecil sendiri, dan baca React TypeScript Cheatsheets.</p>
    </div>
  );
}
