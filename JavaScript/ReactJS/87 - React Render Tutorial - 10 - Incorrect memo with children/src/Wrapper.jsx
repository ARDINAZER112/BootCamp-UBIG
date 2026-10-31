import { memo } from "react";
import useRenderCount from "./useRenderCount";

const Wrapper = memo(function Wrapper({ children }) {
  const renders = useRenderCount();
  return (
    <div>
      <p>Wrapper render: {renders}</p>
      {children}
    </div>
  );
});

export default Wrapper;
