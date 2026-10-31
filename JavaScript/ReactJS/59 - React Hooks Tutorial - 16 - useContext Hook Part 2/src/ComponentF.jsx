import { useContext } from "react";
import { UserContext, ChannelContext } from "./contexts";

// Cara hook: lebih ringkas
export default function ComponentF() {
  const user = useContext(UserContext);
  const channel = useContext(ChannelContext);

  return <h3>Component F: {user} - {channel}</h3>;
}
