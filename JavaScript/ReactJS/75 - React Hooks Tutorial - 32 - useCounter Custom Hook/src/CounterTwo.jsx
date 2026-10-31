import useCounter from "./useCounter";

export default function CounterTwo() {
  const [count, increment, decrement, reset] = useCounter(0, 1);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
