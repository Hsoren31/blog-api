import { useState } from "react";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function onCancel() {
    navigate("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({
          userId: "c20f3689-75a9-4863-956c-a0815d3f12d6",
          title,
          description,
          body,
          published,
          timestamp: new Date(),
        }),
      });
      const data = await response.json();
      if (!response.ok || response.error) {
        setError(data.error);
        throw new Error(data.error);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
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
            value={title}
            onInput={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onInput={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="body">Body: </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onInput={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            name="publish"
            id="publish"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
          <label htmlFor="checkbox">Publish</label>
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </>
  );
}
