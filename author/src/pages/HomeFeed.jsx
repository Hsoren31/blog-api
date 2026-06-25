import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import Post from "./Post";
import { getUserDashboardRequest } from "../utils/apiFetches";

export default function HomeFeed() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draftPosts, setDraftPosts] = useState(null);
  const [publishedPosts, setPublishedPosts] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState("drafts");

  const changeVisiblePosts = (e) => {
    setVisiblePosts(e.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getUserDashboardRequest();
        setUser(user);
        setDraftPosts(user.posts.filter((post) => post.published === false));
        setPublishedPosts(user.posts.filter((post) => post.published === true));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Welcome Back {user.username}!</h1>
      <h2>Your Posts</h2>
      <nav>
        <button
          style={{
            textDecoration: visiblePosts === "drafts" ? "underline" : "none",
          }}
          value={"drafts"}
          onClick={changeVisiblePosts}
        >
          Drafts <span>({draftPosts.length})</span>
        </button>
        <button
          style={{
            textDecoration: visiblePosts === "published" ? "underline" : "none",
          }}
          value={"published"}
          onClick={changeVisiblePosts}
        >
          Published <span>({publishedPosts.length})</span>
        </button>
      </nav>
      {visiblePosts === "drafts" ? (
        <PostList list={draftPosts} />
      ) : (
        <PostList list={publishedPosts} />
      )}
    </>
  );
}
