import PostPreview from "./PostPreview";

export default function App() {
  return (
    <div>
      <h1>HTTP dan React</h1>
      <p>Pola: panggil API di useEffect, simpan hasilnya di state. Axios sudah terpasang untuk episode berikutnya.</p>
      <PostPreview />
    </div>
  );
}
