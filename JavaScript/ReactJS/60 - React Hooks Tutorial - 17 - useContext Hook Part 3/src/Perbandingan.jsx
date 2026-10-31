import { useContext } from "react";
import { UserContext, ChannelContext } from "./contexts";

// Cara lama
export const Lama = () => (
  <UserContext.Consumer>
    {(user) => (
      <ChannelContext.Consumer>
        {(channel) => <div>Lama (Consumer): {user} - {channel}</div>}
      </ChannelContext.Consumer>
    )}
  </UserContext.Consumer>
);

// Cara hook
export const Baru = () => {
  const user = useContext(UserContext);
  const channel = useContext(ChannelContext);
  return <div>Baru (useContext): {user} - {channel}</div>;
};
