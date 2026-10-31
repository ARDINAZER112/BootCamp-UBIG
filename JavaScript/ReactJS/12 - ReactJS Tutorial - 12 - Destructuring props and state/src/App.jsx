import Greet from "./Functional";
import Welcome from "./Class";

export default function App() {
  return (
    <div>
      <Greet nama="Bruce" julukan="Batman" />
      <Welcome nama="Clark" julukan="Superman" />
    </div>
  );
}
