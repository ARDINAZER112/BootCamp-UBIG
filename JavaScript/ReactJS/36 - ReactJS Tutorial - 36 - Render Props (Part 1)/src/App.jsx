import User from "./User";

export default function App() {
  return (
    <div>
      <User render={(isLoggedIn) => (isLoggedIn ? "Ardi" : "Guest")} />
    </div>
  );
}
