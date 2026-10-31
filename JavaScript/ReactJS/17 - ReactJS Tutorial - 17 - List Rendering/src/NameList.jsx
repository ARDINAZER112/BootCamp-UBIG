const nama = ["Bruce", "Clark", "Diana"];

export default function NameList() {
  return (
    <ul>
      {nama.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
}
