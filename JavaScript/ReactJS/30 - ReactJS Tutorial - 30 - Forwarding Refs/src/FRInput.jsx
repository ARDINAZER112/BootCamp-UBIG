import { forwardRef } from "react";

const FRInput = forwardRef(function FRInput(props, ref) {
  return <input type="text" ref={ref} {...props} />;
});

export default FRInput;
