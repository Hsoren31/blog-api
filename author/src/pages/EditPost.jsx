import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePostRequest,
  getSinglePost,
  putPostRequest,
} from "../utils/apiFetches";

export default function EditPost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);

  const onCancel = () => {
    navigate(`/${postId}`);
  };

  function handleChange(e) {
    if (e.target.type === "checkbox") {
      setPostData({
        ...postData,
        [e.target.name]: e.target.checked,
      });
      return;
    }
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { post } = await getSinglePost(postId);
        setPostData(post);
      } catch (err) {
        console.error(err);
        setError(err);
        setPostData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await putPostRequest(postId, postData);
      navigate(`/${postId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    let result = confirm("Are you sure you want to delete this post?");
    if (!result) return;
    try {
      await deletePostRequest(postId);
      navigate("/");
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Edit Post</h1>
      <form>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={postData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            value={postData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="body">Body: </label>
          <textarea
            name="body"
            id="body"
            value={postData.body}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            name="published"
            id="published"
            checked={postData.published}
            onChange={handleChange}
          />
          <label htmlFor="checkbox">Publish</label>
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
      <form onSubmit={onDelete}>
        <button type="submit">Delete Post</button>
      </form>
    </>
  );
}
