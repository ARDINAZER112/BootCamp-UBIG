function Kartu({ judul, children }) {
  return (
    <section style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, marginBottom: 12 }}>
      <h3 style={{ margin: 0 }}>{judul}</h3>
      <p style={{ margin: "6px 0 0" }}>{children}</p>
    </section>
  );
}

export default function App() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h1>ReactJS Tutorial 1 - Introduction</h1>
      <Kartu judul="Berbasis komponen">UI dipecah jadi komponen kecil yang bisa dipakai ulang.</Kartu>
      <Kartu judul="Deklaratif">Tampilan ditentukan oleh data (props dan state), bukan manipulasi DOM manual.</Kartu>
      <Kartu judul="Virtual DOM">React membandingkan UI lama dan baru, lalu hanya mengubah bagian yang berbeda.</Kartu>
      <Kartu judul="Ekosistem besar">Router, state management, UI kit, dan banyak lagi.</Kartu>
    </div>
  );
}
