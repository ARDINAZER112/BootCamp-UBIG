import { UserContext, ChannelContext } from "./contexts";
import ComponentC from "./ComponentC";

export default function App() {
  return (
    <UserContext.Provider value="Ardi">
      <ChannelContext.Provider value="Codevolution">
        <ComponentC />
      </ChannelContext.Provider>
    </UserContext.Provider>
  );
}
