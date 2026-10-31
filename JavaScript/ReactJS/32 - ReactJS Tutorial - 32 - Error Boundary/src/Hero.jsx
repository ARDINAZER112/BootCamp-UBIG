export default function Hero({ nama }) {
  if (nama === "Joker") {
    throw new Error("Bukan pahlawan!");
  }
  return <h3>{nama}</h3>;
}
