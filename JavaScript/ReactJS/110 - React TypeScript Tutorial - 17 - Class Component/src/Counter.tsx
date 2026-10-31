import { Component } from "react";

type CounterProps = { message: string };
type CounterState = { count: number };

export default class Counter extends Component<CounterProps, CounterState> {
  state: CounterState = { count: 0 };

  handleClick = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Tambah</button>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
