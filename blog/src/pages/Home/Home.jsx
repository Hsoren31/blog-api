import { usePosts } from "../../hooks/usePosts";
import PostList from "../../components/PostList";
import "./Home.css";

export default function Home() {
  const { posts, loading, error } = usePosts();

  return (
    <section id="home">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <PostList posts={posts} />
    </section>
  );
}
