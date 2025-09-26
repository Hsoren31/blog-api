import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);

  const onCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postData = await response.json();
        if (response.error) {
          throw new Error(response.error);
        }
        setTitle(postData.post.title);
        setDescription(postData.post.description);
        setBody(postData.post.body);
        setPublished(postData.post.published);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTitle("");
        setDescription("");
        setBody("");
        setPublished(false);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          title,
          description,
          body,
          published,
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

  const onDelete = async (e) => {
    e.preventDefault();
    let result = confirm("Are you sure you want to delete this post?");
    if (!result) return;
    try {
      fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      navigate("/");
    } catch (error) {
      setError(error);
      console.error(error);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="body">Body: </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            name="publish"
            id="publish"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
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
