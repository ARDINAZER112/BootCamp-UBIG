import { UserContext, ChannelContext } from "./contexts";

// Cara lama: Consumer bersarang
export default function ComponentF() {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ChannelContext.Consumer>
          {(channel) => <h3>Component F: {user} - {channel}</h3>}
        </ChannelContext.Consumer>
      )}
    </UserContext.Consumer>
  );
}
