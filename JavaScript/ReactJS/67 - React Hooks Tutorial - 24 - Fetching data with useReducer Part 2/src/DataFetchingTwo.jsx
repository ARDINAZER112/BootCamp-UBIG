import { useReducer, useEffect } from "react";
import axios from "axios";

const initialState = { loading: true, error: "", post: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": return { loading: false, post: action.payload, error: "" };
    case "FETCH_ERROR": return { loading: false, post: {}, error: "Terjadi kesalahan" };
    default: return state;
  }
};

export default function DataFetchingTwo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => dispatch({ type: "FETCH_SUCCESS", payload: res.data }))
      .catch(() => dispatch({ type: "FETCH_ERROR" }));
  }, []);

  return (
    <div>
      {state.loading ? "Loading..." : state.post.title}
      {state.error || null}
    </div>
  );
}
