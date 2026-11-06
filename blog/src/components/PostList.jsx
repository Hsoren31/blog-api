import { Link } from "react-router-dom";
import { formatDateDistance } from "../utilities/formatDate";

export default function PostList({ posts }) {
  return (
    <div>
      {posts.length > 0 ? (
        <ul id="posts">
          {posts.map((post) => (
            <li key={post.id} className="post-list-item">
              <div className="post_frame">
                {post.tags && (
                  <ul className="tags">
                    {post.tags.map((tag) => (
                      <li className="tag" key={tag.id}>
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="post_content">
                <p className="post-credits">
                  {post.author && <>{post.author.username} &middot; </>}
                  {formatDateDistance(
                    post.updatedAt ? post.updatedAt : post.createdAt
                  )}
                </p>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
              <div className="read-more">
                <Link to={`/posts/${post.id}`}>Read more...</Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No Posts written yet.</h3>
      )}
    </div>
  );
}
