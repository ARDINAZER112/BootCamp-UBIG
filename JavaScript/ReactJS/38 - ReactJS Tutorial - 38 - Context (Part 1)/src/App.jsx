import { UserProvider } from "./userContext";
import ComponentC from "./ComponentC";

export default function App() {
  return (
    <UserProvider value="Ardi">
      <ComponentC />
    </UserProvider>
  );
}
