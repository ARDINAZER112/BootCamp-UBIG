export default function Greet(props) {
  return (
    <div>
      <h1>Halo {props.nama} ({props.julukan})</h1>
      {props.children}
    </div>
  );
}
