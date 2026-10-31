import { useState } from "react";

export default function LoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // tipe: boolean (type inference)

  return (
    <div>
      <button onClick={() => setIsLoggedIn(true)}>Login</button>
      <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      <p>User {isLoggedIn ? "login" : "logout"}</p>
    </div>
  );
}
