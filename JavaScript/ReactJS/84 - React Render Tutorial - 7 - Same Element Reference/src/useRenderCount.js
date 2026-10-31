import { useRef } from "react";

// Menghitung berapa kali sebuah komponen di-render (hanya untuk demo belajar)
export default function useRenderCount() {
  const count = useRef(0);
  count.current += 1;
  return count.current;
}
