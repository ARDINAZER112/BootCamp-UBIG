import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant: "primary" | "secondary";
};

export default function CustomButton({ variant, children, ...rest }: ButtonProps) {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  );
}
