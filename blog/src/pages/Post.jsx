import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatLongDate } from "../utilities/formatDate";
import CommentSection from "../components/CommentSection";
import { getPost } from "../utilities/apiRequests";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(postId).then((data) => {
      setPost(data);
    });
  }, [postId]);

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
