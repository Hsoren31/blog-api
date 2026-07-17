import { useParams } from "react-router-dom";
import { useComments } from "../../hooks/useComments";
import { Comment } from "./Comment";
import { CommentReply } from "./CommentReply";

export function CommentSection() {
  const { id } = useParams();
  const { comments, loading, error } = useComments(id);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Comments</h2>
      <CommentReply />
      {comments.length > 1 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} parentId={comment.id} />
        ))
      ) : (
        <p>No Comments Yet.</p>
      )}
    </>
  );
}
