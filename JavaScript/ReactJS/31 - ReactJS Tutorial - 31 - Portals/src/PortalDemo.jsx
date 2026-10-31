import { createPortal } from "react-dom";

export default function PortalDemo() {
  return createPortal(
    <h2 style={{ color: "crimson" }}>Portal demo (di-render ke #portal-root)</h2>,
    document.getElementById("portal-root")
  );
}
