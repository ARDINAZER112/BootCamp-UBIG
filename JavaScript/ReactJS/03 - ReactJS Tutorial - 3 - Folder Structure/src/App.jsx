const struktur = `hello-react/
├── index.html        # titik masuk HTML, ada <div id="root">
├── package.json      # dependency dan script
├── vite.config.js    # konfigurasi Vite
├── public/           # aset statis
└── src/
    ├── main.jsx      # render <App /> ke #root
    ├── App.jsx       # komponen utama
    └── index.css`;

export default function App() {
  return (
    <div>
      <h1>Folder Structure</h1>
      <p>Struktur proyek ini sendiri adalah contohnya:</p>
      <pre style={{ background: "#f4f4f4", padding: 12, borderRadius: 8 }}>{struktur}</pre>
      <p>Alurnya: <code>index.html</code> memuat <code>src/main.jsx</code>, yang me-render <code>App</code> ke elemen <code>#root</code>.</p>
    </div>
  );
}
