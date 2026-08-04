import { Link } from "react-router";
import { formatDateDistance } from "../utils/formatTime";

export default function PostItem({ post }) {
  return (
    <li className="post">
      <Link to={"/" + post.id}>
        <h3>{post.title}</h3>
      </Link>
      <p>{formatDateDistance(post.updatedAt || post.createdAt)}</p>
      <p className="tag-list">
        {post.tags.map((tag) => (
          <span className="tag" key={tag.id}>
            {tag.name}
          </span>
        ))}
      </p>
      <Link className="post-edit" to={"/" + post.id + "/edit"}>
        Edit
      </Link>
    </li>
  );
}
