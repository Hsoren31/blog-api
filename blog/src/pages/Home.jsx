import { usePosts } from "../hooks/usePosts";
import PostList from "../components/PostList";

export default function Home() {
  const { posts, loading, error } = usePosts();

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <PostList posts={posts} />
    </>
  );
}
