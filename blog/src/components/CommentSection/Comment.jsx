import { useContext, useState } from "react";
import { formatShortDate } from "../../utilities/formatDate";
import { CommentReply } from "./CommentReply";
import { EditComment } from "./EditComment";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export function Comment({
  comment,
  parentId = null,
  onSubmit,
  onEdit,
  onDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const hasChildren = comment.children?.length >= 1;

  function toggleEditForm() {
    setShowEditForm((current) => !current);
  }

  function toggleShowChildren() {
    setShowChildren((current) => !current);
  }

  return (
    <>
      <div
        className={`comment ${comment.parentId !== null && "comment-child"}`}
      >
        <div className="comment-credits">
          <p>{comment.author.username}</p>
          <p>{formatShortDate(comment.createdAt)}</p>
        </div>
        <div className="comment-message-row">
          <p>{comment.text}</p>
          {comment.pending && <span>Pending...</span>}
          {currentUser.username === comment.author.username && (
            <button className="comment-action edit" onClick={toggleEditForm}>
              Edit
            </button>
          )}
        </div>
        <div className="comment-actions">
          <button
            className="comment-action reply"
            onClick={() => {
              setShowReplyForm((current) => !current);
            }}
          >
            Reply
          </button>
          {hasChildren && (
            <button
              className="comment-action view-children"
              onClick={toggleShowChildren}
            >
              View Replies
            </button>
          )}
        </div>

        {showEditForm && (
          <EditComment
            comment={comment}
            toggleEditForm={toggleEditForm}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>
      {showReplyForm && (
        <CommentReply
          autoFocus
          parentId={parentId}
          onCancel={() => {
            setShowReplyForm((current) => !current);
          }}
          onSubmit={onSubmit}
          openChildren={() => {
            setShowChildren(true);
          }}
        />
      )}
      {hasChildren &&
        showChildren &&
        comment.children.map((child) => (
          <Comment
            key={child.id}
            comment={child}
            parentId={comment.id}
            onSubmit={onSubmit}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </>
  );
}
