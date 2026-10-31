import Text from "./Text";

export default function App() {
  return (
    <div>
      <Text as="h1" size="lg">Judul (h1)</Text>
      <Text as="p" color="secondary">Paragraf (p)</Text>
      <Text as="a" href="https://react.dev">Tautan (a), href valid karena as="a"</Text>
      <Text>Default: span</Text>
    </div>
  );
}
