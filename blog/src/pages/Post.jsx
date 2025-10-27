import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { formatLongDate } from "../utilities/formatDate";
import CommentSection from "../components/CommentSection";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

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

  return (
    <>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{formatLongDate(post.timestamp)}</p>
          <p>{post.description}</p>
          <p>{post.body}</p>
          <CommentSection />
        </>
      ) : (
        <p>Unable to retrieve post.</p>
      )}
    </>
  );
}
