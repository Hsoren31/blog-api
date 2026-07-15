import { Link } from "react-router-dom";
import { formatDateDistance } from "../utilities/formatDate";
import { usePosts } from "../hooks/usePosts";

export default function Home() {
  const { posts, loading, error } = usePosts();

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {posts?.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <p>{post.title}</p>
                <p>{post.description}</p>
                <p>{post.author.username}</p>
                <p>{formatDateDistance(post.updatedAt || post.createdAt)}</p>
                <p>{post.commentCount}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No Posts Yet.</p>
        )}
      </ul>
    </>
  );
}
