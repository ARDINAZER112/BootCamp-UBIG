import { memo } from "react";

// Impure: hasil bergantung pada waktu, bukan hanya props
export const JamMemo = memo(function JamMemo() {
  return <p>Memo: {new Date().toLocaleTimeString()}</p>;
});

export function JamBiasa() {
  return <p>Biasa: {new Date().toLocaleTimeString()}</p>;
}
