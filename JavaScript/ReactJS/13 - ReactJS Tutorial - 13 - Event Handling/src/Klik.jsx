export default function Klik() {
  function handleClick(event) {
    console.log("Tombol diklik", event.type);
  }

  return <button onClick={handleClick}>Klik saya (function)</button>;
}
