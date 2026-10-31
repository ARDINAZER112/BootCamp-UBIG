import withCounter from "./withCounter";

function HoverCounter({ count, increment }) {
  return <h2 onMouseOver={increment}>Di-hover {count} kali (naik 10)</h2>;
}

export default withCounter(HoverCounter, 10);
