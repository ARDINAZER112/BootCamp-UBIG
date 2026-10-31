import withCounter from "./withCounter";

function ClickCounter({ count, increment }) {
  return <button onClick={increment}>Diklik {count} kali</button>;
}

export default withCounter(ClickCounter);
