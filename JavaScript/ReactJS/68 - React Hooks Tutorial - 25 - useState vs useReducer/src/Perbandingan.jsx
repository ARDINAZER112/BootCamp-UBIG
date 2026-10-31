import { useState, useReducer } from "react";

// Versi useState: dua state terpisah
export function DenganUseState() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <h3>useState</h3>
      <p>Count: {count}, step: {step}</p>
      <button onClick={() => setCount((c) => c + step)}>Tambah</button>
      <button onClick={() => setStep((s) => s + 1)}>Step +1</button>
      <button onClick={() => { setCount(0); setStep(1); }}>Reset</button>
    </div>
  );
}

// Versi useReducer: logika dipusatkan di reducer
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "tambah": return { ...state, count: state.count + state.step };
    case "step": return { ...state, step: state.step + 1 };
    case "reset": return initialState;
    default: return state;
  }
}

export function DenganUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h3>useReducer</h3>
      <p>Count: {state.count}, step: {state.step}</p>
      <button onClick={() => dispatch({ type: "tambah" })}>Tambah</button>
      <button onClick={() => dispatch({ type: "step" })}>Step +1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
