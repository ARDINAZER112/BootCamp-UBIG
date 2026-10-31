import { useState, useEffect } from "react";
import axios from "axios";

export default function DataFetching() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <ul>
      {posts.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}
