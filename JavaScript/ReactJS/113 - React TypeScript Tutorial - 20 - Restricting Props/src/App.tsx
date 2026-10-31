import RandomNumber from "./RandomNumber";

export default function App() {
  return (
    <div>
      <RandomNumber value={10} isPositive />
      <RandomNumber value={-5} isNegative />
      <RandomNumber value={0} isZero />
      {/* <RandomNumber value={10} isPositive isNegative />   error: tidak boleh keduanya */}
    </div>
  );
}
