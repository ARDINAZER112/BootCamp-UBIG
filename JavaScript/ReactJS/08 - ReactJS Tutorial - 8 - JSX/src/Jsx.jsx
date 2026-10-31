import { createElement } from "react";

// Dengan JSX
export const Hello = () => (
  <div className="box">
    <h1>Hello Ardi</h1>
    <label htmlFor="nama">Nama</label>
    <input id="nama" />
    <p>1 + 2 = {1 + 2}</p>
  </div>
);

// Yang sebenarnya terjadi (tanpa JSX)
export const HelloTanpaJsx = () =>
  createElement("div", { className: "box" }, createElement("h1", null, "Hello Ardi (tanpa JSX)"));
