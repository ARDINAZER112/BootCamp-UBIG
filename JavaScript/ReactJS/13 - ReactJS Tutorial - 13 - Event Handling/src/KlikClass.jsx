import { Component } from "react";

export default class KlikClass extends Component {
  clickHandler() {
    console.log("Diklik (class)");
  }

  render() {
    return <button onClick={this.clickHandler}>Klik saya (class)</button>;
  }
}
