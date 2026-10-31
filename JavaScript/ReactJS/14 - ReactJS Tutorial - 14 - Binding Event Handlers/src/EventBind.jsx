import { Component } from "react";

export default class EventBind extends Component {
  state = { pesan: "Halo" };

  constructor(props) {
    super(props);
    this.klikBind = this.klikBind.bind(this); // cara 3
  }

  klikBind() {
    this.setState({ pesan: "Cara 3: bind di constructor" });
  }

  klikArrow = () => {
    // cara 4
    this.setState({ pesan: "Cara 4: arrow property" });
  };

  render() {
    return (
      <div>
        <h1>{this.state.pesan}</h1>
        <button onClick={this.klikBind.bind(this)}>Cara 1</button>
        <button onClick={() => this.klikBind()}>Cara 2</button>
        <button onClick={this.klikBind}>Cara 3</button>
        <button onClick={this.klikArrow}>Cara 4</button>
      </div>
    );
  }
}
