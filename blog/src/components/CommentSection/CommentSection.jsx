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
        setComments((prev) => [newComment.comment, ...prev]);
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
        setComments((current) =>
          current.map((comment) =>
            comment.id === newComment.id
              ? { ...comment, text: newUpdatedComment.text }
              : comment
          )
        );
      } catch (err) {
        setCommentError(err);
      }
    });
  }

  function handleRemoveComment(commentId) {
    setCommentError(null);
    startTransition(async () => {
      dispatch({ type: "remove", id: commentId });

      try {
        await deleteComment(id, commentId);
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      } catch (err) {
        setCommentError(err);
      }
    });
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Comments</h2>
      <CommentReply onSubmit={handleAddComment} />
      {commentError && <p>{error}</p>}
      {optimisticComments.length > 0 ? (
        optimisticComments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            parentId={comment.id}
            onEdit={handleEditComment}
            onDelete={handleRemoveComment}
          />
        ))
      ) : (
        <p>No Comments Yet.</p>
      )}
    </>
  );
}

function commentReducer(state, action) {
  switch (action.type) {
    case "add": {
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
    case "edit": {
      return state.map((comment) =>
        comment.id === action.comment.id ? action.comment : comment
      );
    }
    case "remove": {
      return state.filter((comment) => comment.id !== action.id);
    }
    default: {
      return state;
    }
  }
}
