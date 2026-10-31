import withCounter from "./withCounter";

function HoverCounter({ count, increment }) {
  return <h2 onMouseOver={increment}>Di-hover {count} kali</h2>;
}

export default withCounter(HoverCounter);
