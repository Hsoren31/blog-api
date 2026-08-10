import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePostRequest,
  getSinglePost,
  putPostRequest,
} from "../utils/apiFetches";
import { TagField } from "../components/TagField/TagField";
import { useTagInput } from "../components/TagField/useTagInput";

export default function EditPost() {
  const { tags, setTags, handleAddTag, handleRemoveTag } = useTagInput();
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
        setTags(post.tags.map((tag) => tag.name));
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
      await putPostRequest(postId, { ...postData, tags: tags });
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
            maxLength="50"
          />
          <span className="character-count">
            {postData.title === ""
              ? "50 characters allowed"
              : `${postData.title.length} out of 50 characters`}
          </span>
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            value={postData.description}
            onChange={handleChange}
          ></textarea>
          <span className="character-count">
            {postData.description === ""
              ? "150 characters allowed"
              : `${postData.description.length} out of 150 characters`}
          </span>
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
        <TagField
          tags={tags}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        />
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
        <button
          onClick={onSubmit}
          disabled={
            postData.published === true &&
            postData.title.trim() === "" &&
            postData.body.trim() === ""
          }
        >
          Submit
        </button>
      </form>
      <form onSubmit={onDelete}>
        <button type="submit">Delete Post</button>
      </form>
    </>
  );
}
