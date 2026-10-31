import { Columns, Daftar } from "./Columns";

export default function App() {
  return (
    <div>
      <table border="1" cellPadding="6">
        <tbody>
          <tr>
            <Columns />
          </tr>
        </tbody>
      </table>

      <dl>
        <Daftar
          items={[
            { id: 1, judul: "React", isi: "Library UI" },
            { id: 2, judul: "Vite", isi: "Build tool" },
          ]}
        />
      </dl>
    </div>
  );
}
