import { useState, useEffect } from "react";
import axios from "axios";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch(() => setError("Gagal mengambil data"));
  }, []);

  return (
    <div>
      {posts.map((p) => <div key={p.id}>{p.title}</div>)}
      {error && <p>{error}</p>}
    </div>
  );
}
