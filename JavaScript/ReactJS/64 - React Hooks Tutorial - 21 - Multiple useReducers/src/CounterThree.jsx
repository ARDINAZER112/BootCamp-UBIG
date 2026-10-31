import { useReducer } from "react";

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case "increment": return state + 1;
    case "decrement": return state - 1;
    case "reset": return initialState;
    default: return state;
  }
};

export default function CounterThree() {
  const [countOne, dispatchOne] = useReducer(reducer, initialState);
  const [countTwo, dispatchTwo] = useReducer(reducer, initialState);

  return (
    <div>
      <div>
        Satu: {countOne}
        <button onClick={() => dispatchOne("increment")}>+</button>
        <button onClick={() => dispatchOne("reset")}>Reset</button>
      </div>
      <div>
        Dua: {countTwo}
        <button onClick={() => dispatchTwo("increment")}>+</button>
        <button onClick={() => dispatchTwo("reset")}>Reset</button>
      </div>
    </div>
  );
}
