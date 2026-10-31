import Toast from "./Toast";

export default function App() {
  return (
    <div>
      <Toast position="left-top" />
      <Toast position="center" />
      {/* <Toast position="center-center" />   error: dikecualikan lewat Exclude */}
    </div>
  );
}
