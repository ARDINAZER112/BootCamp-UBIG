import type { ReactNode } from "react";

type OscarProps = {
  children: ReactNode; // elemen, string, angka, array, dll.
};

export default function Oscar({ children }: OscarProps) {
  return <div>{children}</div>;
}
