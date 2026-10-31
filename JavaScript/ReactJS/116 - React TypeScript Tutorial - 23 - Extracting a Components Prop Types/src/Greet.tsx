type GreetProps = { name: string; isLoggedIn: boolean };

export default function Greet({ name, isLoggedIn }: GreetProps) {
  return <p>{isLoggedIn ? `Halo ${name}` : "Silakan login"}</p>;
}
