import PostItem from "./PostItem";
import { Link } from "react-router";

export default function PostList({ list }) {
  if (list.length === 0)
    return (
      <>
        <p>No Posts Here Yet.</p>
        <Link to={"/create"}>Start Writing.</Link>
      </>
    );
  return (
    <ul>
      {list.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
