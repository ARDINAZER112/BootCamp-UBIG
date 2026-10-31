import Counter from "./Counter";

export default function App() {
  return (
    <div>
      <Counter
        render={(count, increment) => (
          <button onClick={increment}>Diklik {count} kali</button>
        )}
      />
      <Counter
        render={(count, increment) => (
          <h2 onMouseOver={increment}>Di-hover {count} kali</h2>
        )}
      />
    </div>
  );
}
