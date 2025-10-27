import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatShortDate } from "../utilities/formatDate";
import { CurrentUserContext } from "../context/CurrentUserContext";

const getComments = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/comments`
    );
    if (!response.ok) {
      throw new Error(`HTTP Status: ${response.status}`);
    }
    const { comments } = await response.json();
    return comments;
  } catch (err) {
    console.log(err);
  }
};
const createComment = async (postId, userId, text, parentId = null) => {
  try {
    await fetch(`http://localhost:3000/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId,
        message: text,
        parentId,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

function Reply({ addComment, currentUser, parentId }) {
  const [comment, setComment] = useState("");
  const handleSubmit = () => {
    addComment(comment, parentId);
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">{currentUser.username}</label>
      <input
        type="text"
        name="comment"
        id="comment"
        value={comment}
        onChange={handleChange}
      />
      <button type="submit">Respond</button>
    </form>
  );
}

function Comment({ addComment, comment, currentUser }) {
  const [isNestedVisible, setIsNestedVisible] = useState(false);
  const [isReplyVisible, setIsReplyVisible] = useState(false);

  const toggleNestedComments = () => {
    if (comment.children.length > 0) {
      isNestedVisible ? setIsNestedVisible(false) : setIsNestedVisible(true);
    }
  };

  const toggleReply = () => {
    isReplyVisible ? setIsReplyVisible(false) : setIsReplyVisible(true);
  };

  /* Comment Object
    {
      author: { username: ""}
      authorId: ""
      children: [
        {
        author: { username: ""}
        authorId: "",
        id: "",
        message: "",
        parentId: "",
        postId: "",
        timestamp: ""
      }]
      id: ""
      message: ""
      parentId: null || ""
      postId: ""
      timestamp: ""
    }
  */

  return (
    <li>
      <div className="row">
        <h3>{comment.author.username}</h3>
        <p>{formatShortDate(comment.timestamp)}</p>
      </div>
      <div className="row">
        <p>{comment.message}</p>
      </div>
      <div className="row">
        {comment.children &&
          (comment.children.length === 0 ? (
            <p>0 Replies</p>
          ) : (
            <a onClick={toggleNestedComments}>
              {comment.children.length === 1
                ? "1 Reply"
                : comment.children.length + " Replies"}
            </a>
          ))}

        <a onClick={toggleReply}>Reply</a>
      </div>
      {isReplyVisible && (
        <Reply
          addComment={addComment}
          currentUser={currentUser}
          parentId={comment.id}
        />
      )}
      {isNestedVisible && (
        <ul>
          {comment.children.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              addComment={addComment}
              currentUser={currentUser}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CommentSection() {
  const [commentList, setCommentList] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const { postId } = useParams();

  useEffect(() => {
    getComments(postId).then((data) => {
      setCommentList(data);
    });
  }, [postId]);

  const addComment = async (text, parentId) => {
    createComment(postId, currentUser.id, text, parentId);
    getComments(postId).then((data) => {
      setCommentList(data);
    });
  };

  return (
    <>
      <h2>{commentList.length} Comments</h2>
      <Reply addComment={addComment} currentUser={currentUser} />
      {commentList.length > 0 ? (
        <ul>
          {commentList.map((comment) => (
            <Comment
              key={comment.id}
              addComment={addComment}
              comment={comment}
              currentUser={currentUser}
            />
          ))}
        </ul>
      ) : (
        <h2>No Responses yet.</h2>
      )}
    </>
  );
}
