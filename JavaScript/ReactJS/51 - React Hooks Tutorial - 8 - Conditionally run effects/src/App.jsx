import HookCounter from "./HookCounter";

export default function App() {
  return (
    <div>
      <p>Buka console: mengetik di input tidak memicu effect.</p>
      <HookCounter />
    </div>
  );
}
