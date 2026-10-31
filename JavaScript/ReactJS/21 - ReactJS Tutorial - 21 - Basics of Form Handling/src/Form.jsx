import { useState } from "react";

export default function Form() {
  const [form, setForm] = useState({ username: "", topik: "react" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" />
      <select name="topik" value={form.topik} onChange={handleChange}>
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>
      <button type="submit">Kirim</button>
    </form>
  );
}
