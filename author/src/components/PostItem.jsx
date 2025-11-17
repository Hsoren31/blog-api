import { Link } from "react-router";

export default function PostItem({ post }) {
  return (
    <li>
      <Link to={"/" + post.id}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.timestamp}</p>
      <Link to={"/" + post.id + "/edit"}>Edit</Link>
    </li>
  );
}
