type GreetProps = {
  name: string;
  messageCount?: number; // opsional
  isLoggedIn: boolean;
};

export default function Greet({ name, messageCount = 0, isLoggedIn }: GreetProps) {
  return (
    <p>
      {isLoggedIn
        ? `Halo ${name}, kamu punya ${messageCount} pesan`
        : "Silakan login"}
    </p>
  );
}
