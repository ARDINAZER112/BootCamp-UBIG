type GreetProps = {
  name: string;
};

export default function Greet({ name }: GreetProps) {
  return <h2>Halo {name}</h2>;
}

// <Greet name="Ardi" />     OK
// <Greet name={42} />       error: number bukan string
// <Greet />                 error: name wajib
