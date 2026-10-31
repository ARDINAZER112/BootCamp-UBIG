import Private from "./Private";
import Profile from "./Profile";

export default function App() {
  return (
    <div>
      <Private isLoggedIn={true} component={Profile} />
      <Private isLoggedIn={false} component={Profile} />
    </div>
  );
}
