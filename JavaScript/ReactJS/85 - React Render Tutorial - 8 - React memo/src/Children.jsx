import { memo } from "react";
import useRenderCount from "./useRenderCount";

export function Biasa({ nama }) {
  const renders = useRenderCount();
  return <p>Biasa ({nama}) render: {renders}</p>;
}

export const DenganMemo = memo(function DenganMemo({ nama }) {
  const renders = useRenderCount();
  return <p>Memo ({nama}) render: {renders}</p>;
});
