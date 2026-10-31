import { useReducer } from "react";
import { reducer, initialState } from "./Reducer";

export default function Counter() {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch("increment")}>+</button>
      <button onClick={() => dispatch("decrement")}>-</button>
      <button onClick={() => dispatch("reset")}>Reset</button>
    </div>
  );
}
