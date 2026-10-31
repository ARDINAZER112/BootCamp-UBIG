import { PureComponent } from "react";

export default class PureComp extends PureComponent {
  render() {
    console.log("PureComp render");
    return <div>Pure: {this.props.nama}</div>;
  }
}
