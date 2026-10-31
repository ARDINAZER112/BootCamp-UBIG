import type { CSSProperties } from "react";

type ContainerProps = {
  styles: CSSProperties;
};

export default function Container({ styles }: ContainerProps) {
  return <div style={styles}>Isi container</div>;
}
