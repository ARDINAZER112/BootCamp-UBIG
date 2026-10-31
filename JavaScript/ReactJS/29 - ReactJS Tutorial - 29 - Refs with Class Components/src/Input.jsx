import { Component, createRef } from "react";

export default class Input extends Component {
  inputRef = createRef();

  fokusInput() {
    this.inputRef.current.focus();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }
}
