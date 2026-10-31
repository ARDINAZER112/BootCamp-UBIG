const nama = ["Bruce", "Clark", "Diana"];

// Aman karena list statis
export function Statis() {
  return nama.map((n, index) => <li key={index}>{n}</li>);
}

// Berbahaya kalau list bisa berubah urutan: pakai id unik
export function Dinamis({ items }) {
  return items.map((item) => <li key={item.id}>{item.nama}</li>);
}
