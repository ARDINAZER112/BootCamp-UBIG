import { useState, useCallback, memo } from "react";

const Title = memo(function Title() {
  console.log("Render Title");
  return <h2>useCallback Hook</h2>;
});

const Count = memo(function Count({ text, count }) {
  console.log(`Render ${text}`);
  return <div>{text} - {count}</div>;
});

const Button = memo(function Button({ handleClick, children }) {
  console.log("Render tombol:", children);
  return <button onClick={handleClick}>{children}</button>;
});

export default function ParentComponent() {
  const [age, setAge] = useState(25);
  const [salary, setSalary] = useState(50000);

  const incrementAge = useCallback(() => setAge((a) => a + 1), []);
  const incrementSalary = useCallback(() => setSalary((s) => s + 1000), []);

  return (
    <div>
      <Title />
      <Count text="Umur" count={age} />
      <Button handleClick={incrementAge}>Tambah umur</Button>
      <Count text="Gaji" count={salary} />
      <Button handleClick={incrementSalary}>Tambah gaji</Button>
    </div>
  );
}
