import { Component } from "react";
import PureComp from "./PureComp";
import RegComp from "./RegComp";

export default class ParentComp extends Component {
  state = { nama: "Ardi" };

  componentDidMount() {
    // setState dengan nilai yang sama tiap 2 detik
    this.id = setInterval(() => this.setState({ nama: "Ardi" }), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    console.log("*** Parent render ***");
    return (
      <div>
        Parent
        <RegComp nama={this.state.nama} />
        <PureComp nama={this.state.nama} />
      </div>
    );
  }
}
