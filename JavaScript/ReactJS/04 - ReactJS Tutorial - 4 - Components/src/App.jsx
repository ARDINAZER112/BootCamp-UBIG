import Welcome from "./Welcome";
import WelcomeClass from "./WelcomeClass";

const kotak = (warna) => ({ background: warna, color: "white", padding: 12, margin: 4, textAlign: "center" });

function Header() {
  return <div style={kotak("#2a5f3f")}>HEADER</div>;
}

function SideNav({ warna }) {
  return <div style={{ ...kotak(warna), flex: "0 0 120px" }}>SIDENAV</div>;
}

function MainContent() {
  return (
    <div style={{ ...kotak("#733c9e"), flex: 1 }}>
      MAIN CONTENT
      <Welcome name="Ardi" />
      <WelcomeClass name="Budi" />
    </div>
  );
}

function Footer() {
  return <div style={kotak("#2a5f3f")}>FOOTER</div>;
}

// Root (App) Component: membungkus semua komponen lain
export default function App() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <SideNav warna="#733c9e" />
        <MainContent />
        <SideNav warna="#1a7bc9" />
      </div>
      <Footer />
    </div>
  );
}
