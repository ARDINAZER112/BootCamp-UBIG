import { Component, createRef } from "react";

export default class ClassRef extends Component {
  inputRef = createRef();

  fokus = () => this.inputRef.current.focus();

  render() {
    return (
      <div>
        <input ref={this.inputRef} placeholder="Input (class + createRef)" />
        <button onClick={this.fokus}>Fokus</button>
      </div>
    );
  }
}
