import { useState } from "react";

export function EditComment({
  comment,
  toggleEditForm,
  onEdit,
  onCancel,
  onDelete,
  autoFocus,
}) {
  const [newComment, setNewComment] = useState(comment.text);

  function handleChange(e) {
    setNewComment(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    onEdit({ id: comment.id, message: newComment, parentId: comment.parentId });
    setNewComment("");
    toggleEditForm();
  }

  function handleDelete(e) {
    e.preventDefault();
    onDelete(comment.id, comment.parentId);
  }

  return (
    <form className="comment-edit" onSubmit={handleSubmit}>
      <input
        type="text"
        name="editComment"
        id="editComment"
        value={newComment}
        onChange={handleChange}
        onBlur={onCancel}
        autoFocus={autoFocus}
      />
      <div className="buttons">
        <button className="comment-actions cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="delete comment-action" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="comment-action submit"
          disabled={
            newComment?.trim() === comment.text || newComment?.trim() === ""
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}
