import { useReducer } from "react";

type CounterState = { count: number };

type UpdateAction = { type: "increment" | "decrement"; payload: number };
type ResetAction = { type: "reset" };
type CounterAction = UpdateAction | ResetAction;

const initialState: CounterState = { count: 0 };

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "increment": return { count: state.count + action.payload };
    case "decrement": return { count: state.count - action.payload };
    case "reset": return initialState;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment", payload: 10 })}>+10</button>
      <button onClick={() => dispatch({ type: "decrement", payload: 10 })}>-10</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}
