import { useParams } from "react-router-dom";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
  useEditComment,
} from "../../hooks/useComments";
import { Comment } from "./Comment";
import { CommentReply } from "./CommentReply";
import { startTransition, useOptimistic, useState } from "react";

export function CommentSection() {
  const { id } = useParams();
  const { comments, loading, error, setComments } = useComments(id);
  const { createComment } = useCreateComment();
  const { editComment } = useEditComment();
  const { deleteComment } = useDeleteComment();
  const [optimisticComments, dispatch] = useOptimistic(
    comments,
    commentReducer
  );
  const [commentError, setCommentError] = useState(null);

  function handleAddComment(comment) {
    setCommentError(null);
    startTransition(async () => {
      dispatch({ type: "add", comment });

      try {
        const newComment = await createComment(id, comment);
        if (!comment.parentId) {
          return setComments((prev) => [newComment.comment, ...prev]);
        }
        return setComments((prev) =>
          prev.map((c) =>
            c.id === newComment.comment.parentId
              ? { ...c, children: [newComment.comment, ...c.children] }
              : c
          )
        );
      } catch (err) {
        setCommentError(err);
      }
    });
  }

  function handleEditComment(newComment) {
    setCommentError(null);
    startTransition(async () => {
      dispatch({ type: "update", newComment });

      try {
        const newUpdatedComment = await editComment(
          id,
          newComment.id,
          newComment
        );
        if (!newUpdatedComment.parentId) {
          setComments((current) =>
            current.map((comment) =>
              comment.id === newComment.id
                ? { ...comment, text: newUpdatedComment.text }
                : comment
            )
          );
        }
        setComments((prev) =>
          prev.map((c) =>
            c.id === newUpdatedComment.parentId
              ? {
                  ...c,
                  children: c.children.map((c) =>
                    c.id === newUpdatedComment.id ? newUpdatedComment : c
                  ),
                }
              : c
          )
        );
      } catch (err) {
        setCommentError(err);
      }
    });
  }

  function handleRemoveComment(commentId, parentId) {
    setCommentError(null);
    startTransition(async () => {
      dispatch({ type: "remove", id: commentId, parentId });

      try {
        await deleteComment(id, commentId);
        if (!parentId) {
          setComments((prev) =>
            prev.filter((comment) => comment.id !== commentId)
          );
        }
        setComments((prev) =>
          prev.map((c) =>
            c.id === parentId
              ? {
                  ...c,
                  children: c.children.filter((c) => c.id !== commentId),
                }
              : c
          )
        );
      } catch (err) {
        setCommentError(err);
      }
    });
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div id="comment-section">
      <h2>Comments</h2>
      <CommentReply onSubmit={handleAddComment} />
      {commentError && <p>{error}</p>}
      {optimisticComments.length > 0 ? (
        <ul id="comment-list">
          {optimisticComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              parentId={comment.id}
              onSubmit={handleAddComment}
              onEdit={handleEditComment}
              onDelete={handleRemoveComment}
            />
          ))}
        </ul>
      ) : (
        <p>No Comments Yet.</p>
      )}
    </div>
  );
}

function commentReducer(state, action) {
  switch (action.type) {
    case "add": {
      if (!action.comment.parentId) {
        return [
          {
            id: "temp-" + Date.now(),
            text: action.comment.message,
            createdAt: Date.now(),
            author: {
              username: "You",
            },
            pending: true,
          },
          ...state,
        ];
      }
      return state.map((c) =>
        c.id === action.comment.parentId
          ? {
              ...c,
              children: [
                ...c.children,
                {
                  id: "temp-" + Date.now(),
                  text: action.comment.message,
                  createdAt: Date.now(),
                  author: {
                    username: "You",
                  },
                  pending: true,
                },
              ],
            }
          : c
      );
    }
    case "edit": {
      if (!action.comment.parentId) {
        return state.map((comment) =>
          comment.id === action.comment.id ? action.comment : comment
        );
      }
      return state.map((c) =>
        c.id === action.comment.parendId
          ? {
              ...c,
              children: (prev) =>
                prev.map((c) =>
                  c.id === action.comment.id ? action.comment : c
                ),
            }
          : c
      );
    }
    case "remove": {
      if (!action.parentId) {
        return state.filter((comment) => comment.id !== action.id);
      }
      return state.map((c) =>
        c.id === action.parentId
          ? {
              ...c,
              children: c.children.filter((c) => c.id !== action.id),
            }
          : c
      );
    }
    default: {
      return state;
    }
  }
}
