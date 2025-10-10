import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
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
    fetchData();
  }, [postId]);

  return (
    <>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.timestamp}</p>
          <p>{post.description}</p>
          <p>{post.body}</p>
          {post.comments ? (
            <div>
              <h3>Comments</h3>
              <ul>
                {post.comments.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.author}</p>
                    <p>{comment.timestamp}</p>
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
