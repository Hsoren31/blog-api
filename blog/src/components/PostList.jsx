import { Link } from "react-router-dom";
import { formatDateDistance } from "../utilities/formatDate";

export default function PostList({ posts }) {
  return (
    <>
      {posts ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-list-item">
              <div className="post_frame">
                {post.tags && (
                  <ul>
                    {post.tags.map((tag) => (
                      <li key={tag.id}>{tag.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <p>
                {post.author && <>{post.author.username} &middot; </>}
                {formatDateDistance(
                  post.updatedAt ? post.updatedAt : post.createdAt
                )}
              </p>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <Link to={`/posts/${post.id}`}>Read more...</Link>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No Posts written yet.</h3>
      )}
    </>
  );
}
