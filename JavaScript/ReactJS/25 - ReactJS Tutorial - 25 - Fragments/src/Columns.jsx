import { Fragment } from "react";

export function Columns() {
  return (
    <>
      <td>Bruce</td>
      <td>30</td>
    </>
  );
}

export function Daftar({ items }) {
  return items.map((item) => (
    <Fragment key={item.id}>
      <dt>{item.judul}</dt>
      <dd>{item.isi}</dd>
    </Fragment>
  ));
}
