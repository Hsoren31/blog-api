import { useState, useEffect, useRef } from "react";

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
  const formRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onCancel;
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onCancel]);

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
    <form ref={formRef} className="comment-reply" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        name="comment"
        value={comment.message}
        onChange={handleChange}
        autoFocus={autoFocus}
        autoComplete="off"
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
