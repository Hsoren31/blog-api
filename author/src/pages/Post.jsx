import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";

export default function Post() {
  const params = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${params.postId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postData = await response.json();
        if (response.error) {
          throw new Error(response.error);
        }
        setPost(postData.post);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <p>{post.published ? "Published" : "Unpublished"}</p>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.body}</p>
      <p>{post.timestamp}</p>
      {post.comments && (
        <ul>
          {post.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.message}</p>
              <p>{comment.author}</p>
            </div>
          ))}
        </ul>
      )}
      <Link to={"/" + post.id + "/edit"}>Edit</Link>
    </>
  );
}
