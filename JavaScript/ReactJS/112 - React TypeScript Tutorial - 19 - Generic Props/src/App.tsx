import List from "./List";

export default function App() {
  return (
    <List
      items={[{ id: 1, nama: "Bruce" }, { id: 2, nama: "Clark" }]}
      onClick={(item) => console.log(item.nama)} // item bertipe { id: number; nama: string }
    />
  );
}
