import { useParams } from "react-router-dom";
import { useAuthor } from "../hooks/useAuthor";

export default function Author() {
  const { authorUsername } = useParams();
  const { author, loading, error } = useAuthor(authorUsername);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {author && (
        <>
          <h1>{author.username}</h1>
          {author.posts && <p>{author.posts.length} Posts</p>}
          <ul>
            {author.posts ? (
              author.posts.map((post) => (
                <li key={post.id}>
                  <p>{post.title}</p>
                  <p>{post.description}</p>
                  <p>{post.author}</p>
                  <p>{post.timestamp}</p>
                  <p>{post.commentCount} Comments</p>
                </li>
              ))
            ) : (
              <p>No Posts.</p>
            )}
          </ul>
        </>
      )}
    </>
  );
}
