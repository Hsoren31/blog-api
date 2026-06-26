import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { formatLongDate } from "../utils/formatTime";
import { getSinglePost } from "../utils/apiFetches";

export default function Post() {
  const params = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        let postData = await getSinglePost(params.postId);
        setPost(postData.post);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <p>{post.published ? "Published" : "Unpublished"}</p>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.body}</p>
      <p>{formatLongDate(post.timestamp)}</p>
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
