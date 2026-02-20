import { Link } from "react-router";
import { formatDateDistance } from "../utils/formatTime";

export default function PostItem({ post }) {
  return (
    <li>
      <Link to={"/" + post.id}>
        <h3>{post.title}</h3>
      </Link>
      <p>{formatDateDistance(post.timestamp)}</p>
      <Link to={"/" + post.id + "/edit"}>Edit</Link>
    </li>
  );
}
