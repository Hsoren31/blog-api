import { useNavigate } from "react-router";

export default function CreatePost() {
  const navigate = useNavigate();

  function onCancel() {
    navigate("/");
  }

  function onSubmit() {
    //save post
    navigate("/");
  }

  return (
    <>
      <h1>Create Post</h1>
      <form>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea name="description" id="description"></textarea>
        </div>
        <div>
          <label htmlFor="body">Body: </label>
          <textarea name="body" id="body"></textarea>
        </div>
        <div>
          <input type="checkbox" name="publish" id="publish" />
          <label htmlFor="checkbox">Publish</label>
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </>
  );
}
