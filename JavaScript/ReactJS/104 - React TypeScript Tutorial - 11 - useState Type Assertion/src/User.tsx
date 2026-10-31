import { useState } from "react";

type AuthUser = { name: string; email: string };

export default function User() {
  // Type assertion: kita yakin state nanti terisi (hati-hati, ini mematikan pengecekan)
  const [user, setUser] = useState<AuthUser>({} as AuthUser);

  return (
    <div>
      <button onClick={() => setUser({ name: "Ardi", email: "ardi@contoh.com" })}>Login</button>
      <p>Nama: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
