import { UserConsumer } from "./userContext";

export default function ComponentF() {
  return (
    <UserConsumer>
      {(username) => <h3>Component F: halo {username}</h3>}
    </UserConsumer>
  );
}
