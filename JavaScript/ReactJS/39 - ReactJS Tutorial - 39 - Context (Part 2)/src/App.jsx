import { UserContext, ChannelContext } from "./contexts";
import ComponentE from "./ComponentE";

export default function App() {
  return (
    <UserContext.Provider value="Ardi">
      <ChannelContext.Provider value="Codevolution">
        <ComponentE />
      </ChannelContext.Provider>
    </UserContext.Provider>
  );
}
