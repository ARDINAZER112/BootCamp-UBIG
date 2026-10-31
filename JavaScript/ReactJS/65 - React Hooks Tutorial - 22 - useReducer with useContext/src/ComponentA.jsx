import { useContext } from "react";
import { CountContext } from "./CountContext";

export default function ComponentA({ nama }) {
  const { count, dispatch } = useContext(CountContext);
  return (
    <div>
      {nama} - Count: {count}
      <button onClick={() => dispatch("increment")}>+</button>
      <button onClick={() => dispatch("decrement")}>-</button>
      <button onClick={() => dispatch("reset")}>Reset</button>
    </div>
  );
}
