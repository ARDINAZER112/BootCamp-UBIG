import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export type AuthUser = { name: string; email: string };

type UserContextType = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};

type UserContextProviderProps = { children: ReactNode };

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
