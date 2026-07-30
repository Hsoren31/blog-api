import { usePost } from "../../hooks/usePosts.js";
import { useParams, Link } from "react-router-dom";
import { formatLongDate } from "../../utilities/formatDate.js";
import { CommentSection } from "../../components/CommentSection/CommentSection.jsx";
import "./Post.css";

export default function Post() {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  if (error) return <p>{error}</p>;
  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      {post ? (
        <div id="post">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div className="post-credits">
            <p>
              Written by{" "}
              <Link to={`/${post.author.username}`}>
                {post.author.username}
              </Link>{" "}
            </p>
            <p>
              {formatLongDate(post.updatedAt ? post.updatedAt : post.createdAt)}
            </p>
          </div>
          <p>{post.body}</p>
          {post.tags !== 0 && (
            <ul id="post-tags">
              {post.tags.map((tag) => (
                <li className="tag" key={tag.id}>
                  {tag.name}
                </li>
              ))}
            </ul>
          )}
          <CommentSection />
        </div>
      ) : (
        <p>Unable to retrieve post.</p>
      )}
    </>
  );
}
