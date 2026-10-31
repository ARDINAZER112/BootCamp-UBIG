export default function UserGreeting({ isLoggedIn, nama }) {
  // 1. if/else
  if (!isLoggedIn) return <div>Silakan login</div>;

  return (
    <div>
      {/* 2. ternary */}
      <h1>{nama ? `Selamat datang ${nama}` : "Selamat datang tamu"}</h1>
      {/* 3. short-circuit */}
      {isLoggedIn && <button>Logout</button>}
    </div>
  );
}
