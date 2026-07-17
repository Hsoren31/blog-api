import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateComment } from "../../hooks/useComments";

export function CommentReply({ autoFocus, parentId = null, onCancel }) {
  const { createComment, loading, error } = useCreateComment();
  const [comment, setComment] = useState({
    parentId,
    message: "",
  });
  const { id } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();
    await createComment(id, comment);
    setComment({
      parentId,
      message: "",
    });
  }

  function handleChange(e) {
    setComment((prevData) => ({ ...prevData, message: e.target.value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <textarea
        placeholder="Write a comment..."
        name="comment"
        value={comment.message}
        onChange={handleChange}
        autoFocus={autoFocus}
      />

      {onCancel && <button onClick={onCancel}>Cancel</button>}
      <button type="submit" disabled={comment.message.trim() === ""}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
