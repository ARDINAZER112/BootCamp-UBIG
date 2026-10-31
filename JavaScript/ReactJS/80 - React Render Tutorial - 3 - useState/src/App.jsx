import UseStateDemo from "./UseStateDemo";

export default function App() {
  return (
    <div>
      <p>Set dengan nilai berbeda memicu render. Set dengan nilai sama biasanya tidak (React bisa render sekali ekstra lalu berhenti).</p>
      <UseStateDemo />
    </div>
  );
}
