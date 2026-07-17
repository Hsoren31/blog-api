import { useState } from "react";
import { formatShortDate } from "../../utilities/formatDate";
import { CommentReply } from "./CommentReply";

export function Comment({ comment, parentId = null }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const hasChildren = comment.children?.length >= 1;

  function toggleShowChildren() {
    setShowChildren((current) => !current);
  }

  return (
    <div>
      <p>
        {comment.author.username} &middot; {formatShortDate(comment.createdAt)}
      </p>
      <p>{comment.text}</p>
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
