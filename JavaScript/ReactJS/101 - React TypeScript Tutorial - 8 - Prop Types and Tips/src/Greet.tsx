import type { GreetProps } from "./Greet.types";

export default function Greet({ name, isLoggedIn }: GreetProps) {
  return <p>{isLoggedIn ? `Halo ${name}` : "Silakan login"}</p>;
}
