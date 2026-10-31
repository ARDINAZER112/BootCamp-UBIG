import type { ComponentType } from "react";
import Login from "./Login";
import type { ProfileProps } from "./Profile";

type PrivateProps = {
  isLoggedIn: boolean;
  component: ComponentType<ProfileProps>;
};

export default function Private({ isLoggedIn, component: Component }: PrivateProps) {
  if (isLoggedIn) return <Component name="Ardi" />;
  return <Login />;
}
