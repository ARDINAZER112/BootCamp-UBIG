import { UserContextProvider } from "./UserContext";
import User from "./User";

export default function App() {
  return (
    <UserContextProvider>
      <User />
    </UserContextProvider>
  );
}
