import { useState } from "react";

const withCounter = (WrappedComponent, incrementNumber) => {
  function WithCounter(props) {
    const [count, setCount] = useState(0);
    const increment = () => setCount((c) => c + incrementNumber);
    return <WrappedComponent count={count} increment={increment} {...props} />;
  }
  return WithCounter;
};

export default withCounter;
