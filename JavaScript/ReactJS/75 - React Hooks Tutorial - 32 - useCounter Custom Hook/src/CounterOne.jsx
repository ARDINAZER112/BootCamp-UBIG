import useCounter from "./useCounter";

export default function CounterOne() {
  const [count, increment, decrement, reset] = useCounter(10, 2);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increment}>+2</button>
      <button onClick={decrement}>-2</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
