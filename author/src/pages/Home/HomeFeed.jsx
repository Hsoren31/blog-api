import { useState } from "react";
import PostList from "../../components/PostList";
import { useUser } from "../../hooks/useUser";
import "./Home.css";

export default function HomeFeed() {
  const username = JSON.parse(localStorage.getItem("user")).username;
  const { user, loading, error } = useUser(username);
  const [draftPosts, setDraftPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState("drafts");

  function changeVisiblePosts(e) {
    setVisiblePosts(e.target.value);
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Welcome Back {user.username}!</h1>
      <h2>Your Posts</h2>
      <nav className="post-nav">
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
