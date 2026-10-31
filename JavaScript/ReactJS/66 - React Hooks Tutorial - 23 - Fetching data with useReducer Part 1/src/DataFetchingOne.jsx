import { useState, useEffect } from "react";
import axios from "axios";

export default function DataFetchingOne() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => { setLoading(false); setPost(res.data); setError(""); })
      .catch(() => { setLoading(false); setPost({}); setError("Terjadi kesalahan"); });
  }, []);

  return <div>{loading ? "Loading..." : post.title}{error || null}</div>;
}
