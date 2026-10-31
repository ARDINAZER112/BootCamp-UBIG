import CustomButton from "./CustomButton";

export default function App() {
  return (
    <div>
      <CustomButton variant="primary" onClick={() => alert("hi")}>Klik</CustomButton>
      <CustomButton variant="secondary" disabled>Nonaktif</CustomButton>
    </div>
  );
}
