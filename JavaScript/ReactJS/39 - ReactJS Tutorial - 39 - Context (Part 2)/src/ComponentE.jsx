import { UserContext, ChannelContext } from "./contexts";

export default function ComponentE() {
  return (
    <UserContext.Consumer>
      {(user) => (
        <ChannelContext.Consumer>
          {(channel) => (
            <div>
              Consumer: {user} di channel {channel}
            </div>
          )}
        </ChannelContext.Consumer>
      )}
    </UserContext.Consumer>
  );
}
