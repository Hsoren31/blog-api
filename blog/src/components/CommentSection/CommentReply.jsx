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
      <input
        type="text"
        placeholder="Write a comment..."
        name="comment"
        value={comment.message}
        onChange={handleChange}
        onBlur={onCancel}
        autoFocus={autoFocus}
      />
      <div className="buttons">
        {onCancel && (
          <button className="cancel comment-action" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button
          className="submit comment-action"
          type="submit"
          disabled={comment.message.trim() === ""}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
