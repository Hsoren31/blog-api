import { useState } from "react";

export function CommentReply({
  autoFocus,
  parentId = null,
  onCancel,
  onSubmit,
  openChildren,
}) {
  const [comment, setComment] = useState({
    parentId,
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(comment);
    openChildren && openChildren();
    setComment({
      parentId,
      message: "",
    });
  }

  function handleChange(e) {
    setComment((prevData) => ({ ...prevData, message: e.target.value }));
  }

  return (
    <form className="comment-reply" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write a comment..."
        name="comment"
        value={comment.message}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
      <div className="buttons">
        {onCancel && (
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={comment.message.trim() === ""}>
          Submit
        </button>
      </div>
    </form>
  );
}
