import type { ComponentProps } from "react";
import Greet from "./Greet";

// Ambil tipe props dari komponen yang sudah ada
type PropsGreet = ComponentProps<typeof Greet>;

export default function Ekstrak(props: PropsGreet) {
  return <Greet {...props} />;
}
