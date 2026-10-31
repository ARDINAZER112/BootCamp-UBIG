import { useState } from "react";
import UserGreeting from "./UserGreeting";

export default function App() {
  const [login, setLogin] = useState(false);

  return (
    <div>
      <button onClick={() => setLogin(!login)}>
        {login ? "Set logout" : "Set login"}
      </button>
      <UserGreeting isLoggedIn={login} nama="Ardi" />
    </div>
  );
}
