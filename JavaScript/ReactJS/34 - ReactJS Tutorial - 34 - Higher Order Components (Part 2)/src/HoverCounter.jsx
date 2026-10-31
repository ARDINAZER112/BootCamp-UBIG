import withCounter from "./withCounter";

function HoverCounter({ count, increment, nama }) {
  return <h2 onMouseOver={increment}>{nama} di-hover {count} kali</h2>;
}

export default withCounter(HoverCounter);
