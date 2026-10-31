import { useState } from "react";

const withCounter = (WrappedComponent) => {
  function WithCounter(props) {
    const [count, setCount] = useState(0);
    return (
      <WrappedComponent
        count={count}
        increment={() => setCount((c) => c + 1)}
        {...props} // teruskan props asli
      />
    );
  }
  return WithCounter;
};

export default withCounter;
