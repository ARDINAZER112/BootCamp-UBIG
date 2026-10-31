import { memo } from "react";
import { useTema } from "./ThemeContext";
import useRenderCount from "./useRenderCount";

export const TidakPakaiContext = memo(function TidakPakaiContext() {
  const renders = useRenderCount();
  return <p>Tidak pakai context (memo) render: {renders}</p>;
});

export function PakaiContext() {
  const { tema, setTema } = useTema();
  const renders = useRenderCount();
  return (
    <p>
      Pakai context render: {renders}{" "}
      <button onClick={() => setTema(tema === "terang" ? "gelap" : "terang")}>Ganti tema ({tema})</button>
    </p>
  );
}
