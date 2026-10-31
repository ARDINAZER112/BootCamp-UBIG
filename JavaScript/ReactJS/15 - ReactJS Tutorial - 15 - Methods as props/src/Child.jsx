export default function Child({ sapaParent }) {
  return <button onClick={() => sapaParent("Child")}>Sapa parent</button>;
}
