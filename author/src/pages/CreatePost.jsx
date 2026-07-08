import { useState } from "react";
import { useNavigate } from "react-router";
import { writePostRequest } from "../utils/apiFetches";
import { TagField } from "../components/TagField/TagField";
import { useTagInput } from "../components/TagField/useTagInput";

export default function CreatePost() {
  const navigate = useNavigate();
  const { tags, handleAddTag, handleRemoveTag } = useTagInput();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    body: "",
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function onCancel() {
    navigate("/");
  }

  function onChange(e) {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await writePostRequest({ ...postData, tags: tags });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Create Post</h1>
      <form>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={postData.title}
            onInput={onChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            value={postData.description}
            onInput={onChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body: </label>
          <textarea
            name="body"
            id="body"
            value={postData.body}
            onInput={onChange}
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
            onChange={onChange}
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
    </>
  );
}
