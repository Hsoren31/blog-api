import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDateDistance } from "../utilities/formatDate";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setPosts(postsData.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {posts ? (
          posts.map((post) => (
            <li key={post.id}>
              <Link to={"/" + post.user.username + "/" + post.id}>
                <p>{post.title}</p>
                <p>{post.description}</p>
                <p>{post.user.username}</p>
                <p>{formatDateDistance(post.timestamp)}</p>
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
