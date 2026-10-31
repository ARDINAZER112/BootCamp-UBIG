import Latihan from "./Latihan";

const pertanyaan = [
  ["Apa itu React?", "Library JS untuk membangun UI berbasis komponen."],
  ["Virtual DOM?", "Representasi UI di memori; React membandingkan versi lama dan baru lalu hanya mengubah bagian yang berbeda di DOM."],
  ["Props vs state?", "Props dari luar dan read-only; state milik komponen dan bisa berubah."],
  ["Kenapa key di list?", "Agar React mengenali item yang berubah, bertambah, atau hilang."],
  ["Controlled vs uncontrolled?", "Controlled: nilai form di state React. Uncontrolled: nilai dibaca dari DOM lewat ref."],
  ["Fungsi useEffect?", "Menjalankan side effect setelah render; dependency menentukan kapan ia jalan lagi."],
  ["useMemo vs useCallback?", "useMemo menyimpan nilai; useCallback menyimpan fungsi."],
  ["Prop drilling dan solusinya?", "Mengoper props lewat banyak level; solusi: context atau state management."],
  ["Kapan komponen render ulang?", "State berubah, props berubah, parent render ulang, atau context berubah."],
  ["HOC / render props / custom hooks?", "Tiga pola berbagi logika. Hooks adalah yang paling modern."],
  ["Error Boundary?", "Class component yang menangkap error render anak dan menampilkan UI cadangan."],
  ["Fragment dan Portal?", "Fragment: bungkus tanpa node tambahan. Portal: render ke node DOM lain."],
];

export default function App() {
  return (
    <div>
      <h1>React Interview Questions</h1>
      {pertanyaan.map(([q, a]) => (
        <details key={q} style={{ marginBottom: 6 }}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
      <h2>Latihan kode</h2>
      <Latihan />
    </div>
  );
}
