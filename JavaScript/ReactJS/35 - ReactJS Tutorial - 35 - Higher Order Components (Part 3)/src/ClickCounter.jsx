import withCounter from "./withCounter";

function ClickCounter({ count, increment }) {
  return <button onClick={increment}>Diklik {count} kali (naik 5)</button>;
}

export default withCounter(ClickCounter, 5);
