import withCounter from "./withCounter";

function ClickCounter({ count, increment, nama }) {
  return <button onClick={increment}>{nama} diklik {count} kali</button>;
}

export default withCounter(ClickCounter);
