import "./app.css";

const heading = { fontSize: "48px", color: "blue" }; // inline style: objek + camelCase

export default function Styled({ primary }) {
  const className = primary ? "primary" : "";
  return (
    <div>
      <h1 className={`${className} font-xl`}>Stylesheet</h1>
      <h1 style={heading}>Inline</h1>
    </div>
  );
}
