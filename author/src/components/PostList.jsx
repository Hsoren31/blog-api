import PostItem from "./PostItem";
import { useNavigate } from "react-router";

export default function PostList({ list }) {
  const navigate = useNavigate();

  function onStartWriting() {
    navigate("/write");
  }

  if (list.length === 0)
    return (
      <div className="no-posts">
        <p>No Posts Here Yet.</p>
        <button className="start-writing" onClick={onStartWriting}>
          Start Writing.
        </button>
      </div>
    );
  return (
    <ul className="post-list">
      {list.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
