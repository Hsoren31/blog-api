import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDateDistance } from "../utilities/formatDate";
import { getAllPosts } from "../utilities/apiRequests";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllPosts().then((data) => {
      if (!data) {
        setError("Something went wrong. Try Again.");
      }
      setPosts(data);
      setLoading(false);
    });
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
