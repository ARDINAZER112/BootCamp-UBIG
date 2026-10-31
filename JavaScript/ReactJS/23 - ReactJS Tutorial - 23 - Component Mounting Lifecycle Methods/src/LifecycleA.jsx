import { Component } from "react";
import LifecycleB from "./LifecycleB";

export default class LifecycleA extends Component {
  constructor(props) {
    super(props);
    this.state = { nama: "Ardi" };
    console.log("A 1. constructor");
  }

  static getDerivedStateFromProps() {
    console.log("A 2. getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("A 5. componentDidMount");
  }

  render() {
    console.log("A 3. render");
    return (
      <div>
        <h2>Lifecycle A</h2>
        <LifecycleB />
      </div>
    );
  }
}
