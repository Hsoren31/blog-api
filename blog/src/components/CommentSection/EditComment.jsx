import { useState } from "react";
import { useEditComment } from "../../hooks/useComments";
import { useParams } from "react-router-dom";

export function EditComment({ comment, toggleEditForm, onDelete }) {
  const { id } = useParams();
  const [newComment, setNewComment] = useState(comment.text);
  const { editComment, loading, error } = useEditComment();

  function handleChange(e) {
    setNewComment(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await editComment(id, comment.id, { message: newComment });
    setNewComment("");
    toggleEditForm();
  }

  function handleDelete(e) {
    e.preventDefault();
    onDelete(comment.id);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
