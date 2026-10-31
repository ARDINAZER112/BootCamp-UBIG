import type { ChangeEvent } from "react";

type InputProps = {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ value, handleChange }: InputProps) {
  return <input type="text" value={value} onChange={handleChange} />;
}
