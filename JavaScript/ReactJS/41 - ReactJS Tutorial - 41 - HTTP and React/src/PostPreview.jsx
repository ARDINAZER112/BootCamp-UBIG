import { useState, useEffect } from "react";

export default function PostPreview() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setError("Gagal mengambil data"));
  }, []);

  return (
    <div>
      {posts.map((p) => <div key={p.id}>{p.title}</div>)}
      {error && <p>{error}</p>}
    </div>
  );
}
