import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// StrictMode sengaja tidak dipakai agar console log (lifecycle, render) tidak muncul dua kali.
createRoot(document.getElementById("root")).render(<App />);
