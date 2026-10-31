import { Component } from "react";

export default class LifecycleB extends Component {
  constructor(props) {
    super(props);
    this.state = { nama: "Budi" };
    console.log("B 4a. constructor");
  }

  static getDerivedStateFromProps() {
    console.log("B 4b. getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("B 4d. componentDidMount (child lebih dulu dari parent)");
  }

  render() {
    console.log("B 4c. render");
    return <h3>Lifecycle B (child)</h3>;
  }
}
