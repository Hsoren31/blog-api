import { useState } from "react";

export function CommentReply({
  autoFocus,
  parentId = null,
  onCancel,
  onSubmit,
}) {
  const [comment, setComment] = useState({
    parentId,
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(comment);
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
      <textarea
        placeholder="Write a comment..."
        name="comment"
        value={comment.message}
        onChange={handleChange}
        autoFocus={autoFocus}
      />

      {onCancel && <button onClick={onCancel}>Cancel</button>}
      <button type="submit" disabled={comment.message.trim() === ""}>
        Submit
      </button>
    </form>
  );
}
