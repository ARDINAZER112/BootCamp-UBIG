import { Component } from "react";

export default class LifecycleUpdate extends Component {
  state = { nama: "Ardi" };

  shouldComponentUpdate() {
    console.log("1. shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate() {
    console.log("3. getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("4. componentDidUpdate");
  }

  render() {
    console.log("2. render");
    return (
      <button onClick={() => this.setState({ nama: "Budi" })}>
        Nama: {this.state.nama} (klik untuk update)
      </button>
    );
  }
}
