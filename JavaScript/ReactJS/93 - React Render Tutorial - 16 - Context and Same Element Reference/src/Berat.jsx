import useRenderCount from "./useRenderCount";

export default function Berat() {
  const renders = useRenderCount();
  return <p>Berat (tanpa context) render: {renders}</p>;
}
