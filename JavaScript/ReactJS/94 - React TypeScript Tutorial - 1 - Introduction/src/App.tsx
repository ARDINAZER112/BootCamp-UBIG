type Fitur = { judul: string; isi: string };

const fitur: Fitur[] = [
  { judul: "Deteksi kesalahan lebih awal", isi: "Salah ketik dan salah props ketahuan saat menulis kode, bukan saat runtime." },
  { judul: "Autocomplete lebih baik", isi: "Editor tahu props dan tipe apa saja yang tersedia." },
  { judul: "Dokumentasi yang hidup", isi: "Tipe props menjelaskan cara memakai komponen." },
];

export default function App() {
  return (
    <div>
      <h1>React TypeScript: Introduction</h1>
      <ul>
        {fitur.map((f) => (
          <li key={f.judul}>
            <strong>{f.judul}</strong>: {f.isi}
          </li>
        ))}
      </ul>
    </div>
  );
}
