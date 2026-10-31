import { useReducer } from "react";
import useRenderCount from "./useRenderCount";

const reducer = (state, action) => {
  switch (action) {
    case "tambah": return state + 1;
    default: return state; // referensi sama -> tidak render ulang
  }
};

export default function UseReducerDemo() {
  const [count, dispatch] = useReducer(reducer, 0);
  const renders = useRenderCount();

  return (
    <div>
      <p>Count: {count} | Render: {renders}</p>
      <button onClick={() => dispatch("tambah")}>Tambah</button>
      <button onClick={() => dispatch("tidak-ada")}>Action tidak dikenal (state sama)</button>
    </div>
  );
}
