import { useState, useEffect, useRef } from "react";

export function EditComment({
  comment,
  toggleEditForm,
  onEdit,
  onCancel,
  onDelete,
  autoFocus,
}) {
  const [newComment, setNewComment] = useState(comment.text);
  const formRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onCancel();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onCancel]);

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
    <form className="comment-edit" onSubmit={handleSubmit} ref={formRef}>
      <input
        type="text"
        name="editComment"
        id="editComment"
        value={newComment}
        onChange={handleChange}
        autoFocus={autoFocus}
      />
      <div className="buttons">
        <button
          type="button"
          className="comment-actions cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="delete comment-action"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="submit"
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
