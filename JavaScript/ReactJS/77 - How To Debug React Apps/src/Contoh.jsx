export default function Contoh({ items }) {
  const total = items.reduce((sum, i) => {
    // debugger; // hapus tanda komentar: browser berhenti di sini saat DevTools terbuka
    return sum + i.harga;
  }, 0);

  console.table(items);
  console.log("Total:", total);

  return <p>Total: {total}</p>;
}
