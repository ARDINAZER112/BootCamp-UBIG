import Status from "./Status";
import Heading from "./Heading";
import Oscar from "./Oscar";

export default function App() {
  return (
    <div>
      <Status status="success" />
      <Heading>Placeholder text</Heading>
      <Oscar>
        <Heading>Oscar goes to Leonardo DiCaprio!</Heading>
      </Oscar>
    </div>
  );
}
