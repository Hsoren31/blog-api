import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { formatLongDate } from "../../utils/formatTime";
import { getSinglePost } from "../../utils/apiFetches";
import "./Post.css";

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
    <div className="post-container">
      <p className="publish-status">
        {post.published ? "Published" : "Unpublished"}
      </p>
      <div className="post-credits">
        <p>{post.author.username}</p>
        <p>{formatLongDate(post.updatedAt || post.createdAt)}</p>
        <Link className="post-edit" to={"/" + post.id + "/edit"}>
          Edit
        </Link>
      </div>

      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.body}</p>
      <p className="tag-list">
        {post.tags.map((tag) => (
          <span className="tag" key={tag.id}>
            {tag.name}
          </span>
        ))}
      </p>

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
    </div>
  );
}
