import Counter from "./Counter";

export default function App() {
  return (
    <div>
      <h1>React Render Tutorial: Introduction</h1>
      <p>Seri ini membahas kapan dan kenapa komponen di-render ulang, dan bagaimana mengoptimalkannya.</p>
      <ul>
        <li>Proses render dan pemicunya</li>
        <li>State immutability</li>
        <li><code>memo</code>, <code>useMemo</code>, <code>useCallback</code></li>
        <li>Context</li>
      </ul>
      <Counter />
    </div>
  );
}
