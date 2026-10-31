import Greet from "./Greet";

export default function App() {
  return (
    <div>
      <Greet name="Ardi" isLoggedIn={true} />
      <Greet name="Budi" isLoggedIn={false} />
    </div>
  );
}
