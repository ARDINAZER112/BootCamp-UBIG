import useRenderCount from "./useRenderCount";

export default function Render() {
  const renders = useRenderCount();
  console.log("Render dipanggil, ke-", renders);
  return <h2>Fungsi komponen sudah dipanggil {renders} kali</h2>;
}
