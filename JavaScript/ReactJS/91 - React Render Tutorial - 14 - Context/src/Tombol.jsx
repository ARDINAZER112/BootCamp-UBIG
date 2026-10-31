import { useTema } from "./ThemeContext";
import useRenderCount from "./useRenderCount";

export default function Tombol() {
  const { tema, setTema } = useTema();
  const renders = useRenderCount();

  return (
    <button onClick={() => setTema(tema === "terang" ? "gelap" : "terang")}>
      Tema: {tema} (render: {renders})
    </button>
  );
}
