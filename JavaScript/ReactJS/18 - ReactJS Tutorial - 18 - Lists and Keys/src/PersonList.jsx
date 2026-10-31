const persons = [
  { id: 1, nama: "Bruce", umur: 30 },
  { id: 2, nama: "Clark", umur: 35 },
  { id: 3, nama: "Diana", umur: 28 },
];

export default function PersonList() {
  return (
    <div>
      {persons.map((p) => (
        <h2 key={p.id}>{p.nama} ({p.umur})</h2>
      ))}
    </div>
  );
}
