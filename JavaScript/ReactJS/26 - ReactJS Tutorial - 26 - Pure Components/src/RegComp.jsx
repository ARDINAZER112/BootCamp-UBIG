import { Component } from "react";

export default class RegComp extends Component {
  render() {
    console.log("RegComp render");
    return <div>Regular: {this.props.nama}</div>;
  }
}
