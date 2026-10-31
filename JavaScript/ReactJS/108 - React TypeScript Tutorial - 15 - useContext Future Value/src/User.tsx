import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function User() {
  const userContext = useContext(UserContext);

  const login = () => {
    if (userContext) userContext.setUser({ name: "Ardi", email: "ardi@contoh.com" });
  };

  return (
    <div>
      <button onClick={login}>Login</button>
      <p>Nama: {userContext?.user?.name}</p>
    </div>
  );
}
