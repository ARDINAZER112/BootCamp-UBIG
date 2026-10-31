import { Component } from "react";

export default class Message extends Component {
  constructor() {
    super();
    this.state = { pesan: "Selamat datang, pengunjung" };
  }

  ubahPesan() {
    this.setState({ pesan: "Terima kasih sudah berlangganan" });
  }

  render() {
    return (
      <div>
        <h1>{this.state.pesan}</h1>
        <button onClick={() => this.ubahPesan()}>Langganan</button>
      </div>
    );
  }
}
