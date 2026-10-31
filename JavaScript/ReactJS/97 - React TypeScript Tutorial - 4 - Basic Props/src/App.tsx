import Greet from "./Greet";
import { Person, PersonList } from "./Person";

export default function App() {
  return (
    <div>
      <Greet name="Ardi" messageCount={5} isLoggedIn={true} />
      <Greet name="Budi" isLoggedIn={false} />
      <Person nama={{ depan: "Bruce", belakang: "Wayne" }} />
      <PersonList
        daftar={[
          { depan: "Clark", belakang: "Kent" },
          { depan: "Diana", belakang: "Prince" },
        ]}
      />
    </div>
  );
}
