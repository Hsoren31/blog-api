import { useContext, useState } from "react";
import { formatShortDate } from "../../utilities/formatDate";
import { CommentReply } from "./CommentReply";
import { EditComment } from "./EditComment";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export function Comment({ comment, parentId = null }) {
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

  console.log(currentUser.username, comment.author.username);

  return (
    <div>
      <p>
        {comment.author.username} &middot; {formatShortDate(comment.createdAt)}
      </p>
      <p>{comment.text}</p>
      {currentUser.username === comment.author.username && (
        <button onClick={toggleEditForm}>Edit</button>
      )}
      {showEditForm && (
        <EditComment comment={comment} toggleEditForm={toggleEditForm} />
      )}
      <button
        onClick={() => {
          setShowReplyForm((current) => !current);
        }}
      >
        Reply
      </button>
      {showReplyForm && (
        <CommentReply
          autoFocus
          parentId={parentId}
          onCancel={() => {
            setShowReplyForm((current) => !current);
          }}
        />
      )}
      {hasChildren && (
        <button onClick={toggleShowChildren}>View Replies</button>
      )}

      {hasChildren &&
        showChildren &&
        comment.children.map((child) => (
          <Comment key={child.id} comment={child} parentId={comment.id} />
        ))}
    </div>
  );
}
