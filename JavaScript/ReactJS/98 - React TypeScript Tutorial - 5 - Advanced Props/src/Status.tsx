type StatusProps = {
  status: "loading" | "success" | "error";
};

export default function Status({ status }: StatusProps) {
  let pesan = "";
  if (status === "loading") pesan = "Memuat...";
  else if (status === "success") pesan = "Berhasil";
  else pesan = "Terjadi kesalahan";
  return <h2>{pesan}</h2>;
}
