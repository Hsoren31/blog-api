import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TagField } from "../components/TagField/TagField";
import { useTagInput } from "../components/TagField/useTagInput";
import { useDeletePost, useEditPost, usePost } from "../hooks/usePost";

export default function EditPost() {
  const { postId } = useParams();
  const { post, loading, error } = usePost(postId);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <EditForm
        initialData={{
          title: post.title,
          description: post.description,
          body: post.body,
          published: post.published,
          tags: post.tags.map((tag) => tag.name),
          id: post.id,
        }}
      />
      <DeletePostBtn postId={post.id} />
    </div>
  );
}

function EditForm({ initialData }) {
  const { editPost, loading, error } = useEditPost();
  const [postData, setPostData] = useState(initialData);
  const { tags, handleAddTag, handleRemoveTag } = useTagInput(initialData.tags);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setPostData((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
      return;
    }
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submitEdit(e) {
    e.preventDefault();
    await editPost(postData.id, { ...postData, tags });
    navigate(`/${postData.id}`);
  }

  function onCancel() {
    navigate(`/${postData.id}`);
  }

  return (
    <form>
      <legend>Edit Post</legend>
      {error && <p>{error}</p>}
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
        onClick={submitEdit}
        disabled={
          postData.published === true &&
          postData.title.trim() === "" &&
          postData.body.trim() === ""
        }
      >
        {loading ? "Loading" : "Submit"}
      </button>
    </form>
  );
}

function DeletePostBtn({ postId }) {
  const { deletePost, loading, error } = useDeletePost();
  const navigate = useNavigate();

  async function onDelete() {
    const confirmation = confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );
    if (confirmation) {
      await deletePost(postId);
      navigate("/");
    }
  }

  if (error) return <p>{error}</p>;

  return <button onClick={onDelete}>{loading ? "Loading" : "Delete"}</button>;
}
