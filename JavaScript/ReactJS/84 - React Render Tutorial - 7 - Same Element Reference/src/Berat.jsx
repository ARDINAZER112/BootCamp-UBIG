import useRenderCount from "./useRenderCount";

export default function Berat() {
  const renders = useRenderCount();
  return <p>Komponen Berat render: {renders} (tetap 1 walau Counter berubah)</p>;
}
