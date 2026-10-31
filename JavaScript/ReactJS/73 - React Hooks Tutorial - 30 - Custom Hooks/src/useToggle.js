import { useState } from "react";

// Custom hook: nama diawali "use", memakai hook lain di dalamnya
export default function useToggle(awal = false) {
  const [nilai, setNilai] = useState(awal);
  const toggle = () => setNilai((n) => !n);
  return [nilai, toggle];
}
