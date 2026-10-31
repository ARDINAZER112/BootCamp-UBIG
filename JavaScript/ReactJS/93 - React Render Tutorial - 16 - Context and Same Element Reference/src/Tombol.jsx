import { useContext } from "react";
import { CountContext } from "./CountProvider";
import useRenderCount from "./useRenderCount";

export default function Tombol() {
  const { count, setCount } = useContext(CountContext);
  const renders = useRenderCount();

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count} (Tombol render: {renders})
    </button>
  );
}
