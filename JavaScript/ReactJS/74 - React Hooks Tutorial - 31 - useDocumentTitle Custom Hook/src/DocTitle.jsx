import { useState } from "react";
import useDocumentTitle from "./useDocumentTitle";

export default function DocTitle() {
  const [count, setCount] = useState(0);
  useDocumentTitle(count);
  return <button onClick={() => setCount(count + 1)}>Count {count} (lihat judul tab)</button>;
}
