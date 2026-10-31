import UserContext from "./userContext";
import ComponentF from "./ComponentF";

export default function App() {
  return (
    <div>
      <h3>Dengan Provider</h3>
      <UserContext.Provider value="Ardi">
        <ComponentF />
      </UserContext.Provider>

      <h3>Tanpa Provider (nilai default)</h3>
      <ComponentF />
    </div>
  );
}
