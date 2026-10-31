import type { MouseEvent } from "react";

type ButtonProps = {
  handleClick: (event: MouseEvent<HTMLButtonElement>, id: number) => void;
};

export default function Button({ handleClick }: ButtonProps) {
  return <button onClick={(event) => handleClick(event, 1)}>Klik</button>;
}
