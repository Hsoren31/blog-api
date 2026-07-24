import { useState } from "react";

export function EditComment({ comment, toggleEditForm, onEdit, onDelete }) {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="editComment">Edit</label>
      <input
        type="text"
        name="editComment"
        id="editComment"
        value={newComment}
        onChange={handleChange}
      />
      <button
        disabled={
          newComment?.trim() === comment.text || newComment?.trim() === ""
        }
      >
        Submit
      </button>
      <button onClick={handleDelete}>Delete</button>
    </form>
  );
}
