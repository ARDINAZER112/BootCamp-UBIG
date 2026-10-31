import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action) {
    case "increment": return state + 1;
    case "decrement": return state - 1;
    case "reset": return 0;
    default: return state;
  }
};

export const CountContext = createContext();

export function CountProvider({ children }) {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <CountContext.Provider value={{ count, dispatch }}>
      {children}
    </CountContext.Provider>
  );
}
