import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type TextOwnProps<C extends ElementType> = {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  as?: C;
  children?: ReactNode;
};

type TextProps<C extends ElementType> = TextOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof TextOwnProps<C>>;

export default function Text<C extends ElementType = "span">({
  size = "md",
  color = "primary",
  as,
  children,
  ...rest
}: TextProps<C>) {
  const Component: ElementType = as || "span";
  return (
    <Component className={`class-${size} class-${color}`} {...rest}>
      {children}
    </Component>
  );
}
