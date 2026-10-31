import { useState, useEffect } from "react";
import axios from "axios";

export default function DataFetching() {
  const [post, setPost] = useState({});
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(console.error);
  }, [id]);

  return (
    <div>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
      <h3>{post.title}</h3>
    </div>
  );
}
