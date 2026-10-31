import NameList from "./NameList";
import Person from "./Person";

const persons = [
  { id: 1, nama: "Bruce", umur: 30 },
  { id: 2, nama: "Clark", umur: 35 },
  { id: 3, nama: "Diana", umur: 28 },
];

export default function App() {
  return (
    <div>
      <NameList />
      {persons.map((p) => (
        <Person key={p.id} person={p} />
      ))}
    </div>
  );
}
