import ParentComponent from "./ParentComponent";

export default function App() {
  return (
    <div>
      <p>Buka console: hanya bagian yang berubah yang di-render ulang.</p>
      <ParentComponent />
    </div>
  );
}
