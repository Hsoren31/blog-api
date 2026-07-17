import { usePost } from "../hooks/usePosts.js";
import { useParams, Link } from "react-router-dom";
import { formatLongDate } from "../utilities/formatDate";
import { CommentSection } from "../components/CommentSection/CommentSection.jsx";

export default function Post() {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  if (error) return <p>{error}</p>;
  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      {post ? (
        <>
          <p>
            <Link to={`/${post.author.username}`}>{post.author.username}</Link>{" "}
            &middot;{" "}
            {formatLongDate(post.updatedAt ? post.updatedAt : post.createdAt)}
          </p>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>{post.body}</p>
          <CommentSection />
        </>
      ) : (
        <p>Unable to retrieve post.</p>
      )}
    </>
  );
}
