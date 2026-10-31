import { useState, useEffect } from "react";
import axios from "axios";

export default function DataFetching() {
  const [post, setPost] = useState({});
  const [id, setId] = useState(1);
  const [idDariTombol, setIdDariTombol] = useState(1);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${idDariTombol}`)
      .then((res) => setPost(res.data))
      .catch(console.error);
  }, [idDariTombol]);

  return (
    <div>
      <input value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={() => setIdDariTombol(id)}>Ambil post</button>
      <h3>{post.title}</h3>
    </div>
  );
}
