import { Component } from "react";
import UserContext from "./userContext";

export default class ComponentF extends Component {
  static contextType = UserContext;

  render() {
    return <div>Context: {this.context}</div>;
  }
}
