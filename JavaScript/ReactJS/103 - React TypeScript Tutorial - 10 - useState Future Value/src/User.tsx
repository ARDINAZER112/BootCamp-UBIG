import { useState } from "react";

type AuthUser = { name: string; email: string };

export default function User() {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <div>
      <button onClick={() => setUser({ name: "Ardi", email: "ardi@contoh.com" })}>Login</button>
      <button onClick={() => setUser(null)}>Logout</button>
      <p>Nama: {user?.name}</p>
    </div>
  );
}
