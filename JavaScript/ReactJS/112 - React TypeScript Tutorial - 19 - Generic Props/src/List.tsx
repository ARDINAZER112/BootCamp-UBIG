type ListProps<T> = {
  items: T[];
  onClick: (value: T) => void;
};

export default function List<T extends { id: number }>({ items, onClick }: ListProps<T>) {
  return (
    <div>
      <h2>Daftar</h2>
      {items.map((item) => (
        <div key={item.id} onClick={() => onClick(item)} style={{ cursor: "pointer" }}>
          {JSON.stringify(item)}
        </div>
      ))}
    </div>
  );
}
