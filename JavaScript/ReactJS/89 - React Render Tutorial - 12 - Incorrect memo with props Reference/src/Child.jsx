import { memo } from "react";
import useRenderCount from "./useRenderCount";

const Child = memo(function Child({ label, data, onKlik }) {
  const renders = useRenderCount();
  return (
    <p>
      {label} render: {renders}{" "}
      <button onClick={onKlik}>{data.nama}</button>
    </p>
  );
});

export default Child;
