import { Component, createRef } from "react";
import Input from "./Input";

export default class Parent extends Component {
  inputRef = createRef();

  fokus = () => this.inputRef.current.fokusInput();

  render() {
    return (
      <div>
        <Input ref={this.inputRef} />
        <button onClick={this.fokus}>Fokus input</button>
      </div>
    );
  }
}
