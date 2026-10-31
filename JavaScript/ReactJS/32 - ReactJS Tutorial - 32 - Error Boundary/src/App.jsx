import ErrorBoundary from "./ErrorBoundary";
import Hero from "./Hero";

export default function App() {
  return (
    <div>
      <ErrorBoundary><Hero nama="Batman" /></ErrorBoundary>
      <ErrorBoundary><Hero nama="Superman" /></ErrorBoundary>
      <ErrorBoundary><Hero nama="Joker" /></ErrorBoundary>
    </div>
  );
}
