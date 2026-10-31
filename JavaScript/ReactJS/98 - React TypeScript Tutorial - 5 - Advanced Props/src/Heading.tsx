type HeadingProps = {
  children: string;
};

export default function Heading({ children }: HeadingProps) {
  return <h2>{children}</h2>;
}
