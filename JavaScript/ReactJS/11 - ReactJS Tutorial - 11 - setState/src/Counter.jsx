import { Component } from "react";

export default class Counter extends Component {
  state = { count: 0 };

  tambah() {
    this.setState(
      (prev) => ({ count: prev.count + 1 }),
      () => console.log("Setelah update:", this.state.count)
    );
  }

  tambahLima() {
    for (let i = 0; i < 5; i++) {
      this.setState((prev) => ({ count: prev.count + 1 }));
    }
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={() => this.tambah()}>+1</button>
        <button onClick={() => this.tambahLima()}>+5</button>
      </div>
    );
  }
}
