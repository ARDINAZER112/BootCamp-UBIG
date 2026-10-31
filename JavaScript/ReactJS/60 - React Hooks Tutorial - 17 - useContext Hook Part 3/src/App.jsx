import { UserContext, ChannelContext } from "./contexts";
import { Lama, Baru } from "./Perbandingan";

export default function App() {
  return (
    <UserContext.Provider value="Ardi">
      <ChannelContext.Provider value="Codevolution">
        <Lama />
        <Baru />
      </ChannelContext.Provider>
    </UserContext.Provider>
  );
}
