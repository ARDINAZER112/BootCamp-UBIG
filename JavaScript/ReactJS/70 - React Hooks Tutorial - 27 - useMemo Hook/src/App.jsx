import Counter from "./Counter";

export default function App() {
  return (
    <div>
      <p>Tombol One lambat (perhitungan mahal). Tombol Two cepat karena hasilnya di-memo.</p>
      <Counter />
    </div>
  );
}
