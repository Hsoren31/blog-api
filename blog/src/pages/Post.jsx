import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { formatLongDate, formatShortDate } from "../utilities/formatDate";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  async function fetchData() {
    const response = await fetch(`http://localhost:3000/posts/${postId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error("HTTP Error: Status " + response.status);
    }
    let postData = await response.json();
    setPost(postData.post);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          userId: currentUser.id,
          message: comment,
        }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
      throw new Error(err);
    } finally {
      setComment(" ");
    }
  };

  return (
    <>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{formatLongDate(post.timestamp)}</p>
          <p>{post.description}</p>
          <p>{post.body}</p>
          <h3>Comments</h3>
          <form onSubmit={addComment}>
            <label htmlFor="comment">{currentUser.username}</label>
            <input
              type="text"
              name="comment"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button type="submit">Add</button>
          </form>
          {post.comments ? (
            <div>
              <ul>
                {post.comments.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.author.username}</p>
                    <p>{formatShortDate(comment.timestamp)}</p>
                    <p>{comment.message}</p>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <p>No Comments Yet.</p>
          )}
        </>
      ) : (
        <p>Unable to retrieve post.</p>
      )}
    </>
  );
}
