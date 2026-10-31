import { Component } from "react";

export default class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("[Mounting] constructor");
  }

  static getDerivedStateFromProps() {
    console.log("[Mounting/Updating] getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("[Mounting] componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("[Updating] shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate() {
    console.log("[Updating] getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("[Updating] componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("[Unmounting] componentWillUnmount");
  }

  render() {
    console.log("[Mounting/Updating] render");
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
