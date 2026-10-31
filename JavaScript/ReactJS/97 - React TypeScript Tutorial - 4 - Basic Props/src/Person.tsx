type Nama = { depan: string; belakang: string };

type PersonProps = { nama: Nama };
type PersonListProps = { daftar: Nama[] };

export function Person({ nama }: PersonProps) {
  return <h3>{nama.depan} {nama.belakang}</h3>;
}

export function PersonList({ daftar }: PersonListProps) {
  return (
    <>
      {daftar.map((n) => (
        <h3 key={n.depan + n.belakang}>{n.depan} {n.belakang}</h3>
      ))}
    </>
  );
}
