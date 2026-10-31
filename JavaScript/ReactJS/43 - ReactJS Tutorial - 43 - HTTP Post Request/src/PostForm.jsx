import { useState } from "react";
import axios from "axios";

export default function PostForm() {
  const [form, setForm] = useState({ userId: "", title: "", body: "" });
  const [hasil, setHasil] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/posts", form)
      .then((res) => setHasil(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="userId" value={form.userId} onChange={handleChange} placeholder="userId" />
        <input name="title" value={form.title} onChange={handleChange} placeholder="title" />
        <input name="body" value={form.body} onChange={handleChange} placeholder="body" />
        <button type="submit">Kirim</button>
      </form>
      {hasil && <pre>{JSON.stringify(hasil, null, 2)}</pre>}
    </div>
  );
}
