import { Component } from "react";

export default class Welcome extends Component {
  state = { pesan: "Halo" };

  render() {
    const { nama, julukan } = this.props;
    const { pesan } = this.state;
    return <h1>{pesan} {nama} alias {julukan}</h1>;
  }
}
