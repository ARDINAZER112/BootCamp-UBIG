import useRenderCount from "./useRenderCount";

export default function Child() {
  const renders = useRenderCount();
  return <p>Child render: {renders} (ikut naik tiap parent render)</p>;
}
