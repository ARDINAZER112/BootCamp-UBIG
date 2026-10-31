import Greet from "./Greet";

export default function App() {
  return (
    <>
      <Greet nama="Bruce" julukan="Batman">
        <p>Ini children</p>
      </Greet>
      <Greet nama="Clark" julukan="Superman" />
    </>
  );
}
