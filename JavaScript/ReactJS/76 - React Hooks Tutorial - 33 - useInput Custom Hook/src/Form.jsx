import useInput from "./useInput";

export default function Form() {
  const [depan, bindDepan, resetDepan] = useInput("");
  const [belakang, bindBelakang, resetBelakang] = useInput("");

  const submit = (e) => {
    e.preventDefault();
    alert(`Halo ${depan} ${belakang}`);
    resetDepan();
    resetBelakang();
  };

  return (
    <form onSubmit={submit}>
      <input {...bindDepan} placeholder="Depan" />
      <input {...bindBelakang} placeholder="Belakang" />
      <button type="submit">Kirim</button>
    </form>
  );
}
