import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Ditangkap ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) return <h3>Ada yang salah.</h3>;
    return this.props.children;
  }
}
