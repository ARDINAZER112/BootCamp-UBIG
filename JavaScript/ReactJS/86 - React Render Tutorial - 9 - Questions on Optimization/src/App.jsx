const qa = [
  ["Kenapa tidak membungkus semua komponen dengan memo?", "Perbandingan props punya biaya, dan sering tidak ada hasilnya."],
  ["Kenapa React tidak memo otomatis?", "Tidak semua komponen untung, dan overhead perbandingan bisa lebih mahal dari render itu sendiri."],
  ["Kapan optimasi diperlukan?", "Setelah diukur (React Profiler) dan terbukti ada masalah."],
  ["Apa strategi yang baik?", "Ukur dulu, perbaiki struktur (state turun ke bawah, pakai children) sebelum memakai memo, useMemo, useCallback."],
];

export default function App() {
  return (
    <div>
      <h1>Questions on Optimization</h1>
      {qa.map(([q, a]) => (
        <details key={q} style={{ marginBottom: 8 }}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
