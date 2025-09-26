import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomeFeed() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${localStorage.getItem("userId")}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let userData = await response.json();
        if (response.error) {
          throw new Error(response.error);
        }
        setUser(userData.user);
        setPosts(userData.user.posts);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPosts(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <h1>Welcome Back {user.username}!</h1>
      <ul>
        {posts.length == 0 ? (
          <p>No Posts yet.</p>
        ) : (
          posts.map((post) => (
            <li key={post.id}>
              <Link to={"/" + post.id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.timestamp}</p>
                <p>{post.published ? "Published" : "Unpublished"}</p>
              </Link>
              <Link to={"/" + post.id + "/edit"}>Edit</Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
