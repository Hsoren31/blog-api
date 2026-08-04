import PostItem from "./PostItem";
import { Link } from "react-router";

export default function PostList({ list }) {
  if (list.length === 0)
    return (
      <div className="no-posts">
        <p>No Posts Here Yet.</p>
        <Link to={"/write"}>Start Writing.</Link>
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
