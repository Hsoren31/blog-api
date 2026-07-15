import { useParams } from "react-router-dom";
import { useAuthor } from "../hooks/useAuthor";
import PostList from "../components/PostList";

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
          <PostList posts={author.posts} />
        </>
      )}
    </>
  );
}
