import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: 5,
    title: "Fake Title 5",
    description:
      "Iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \n Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \n Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
    timestamp: "Sun Feb 10 2025 03:09:04",
    published: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setPost((prevData) => ({
      ...prevData,
      published: e.target.checked,
    }));
  };

  const onCancel = () => {
    navigate("/");
  };

  const onSubmit = () => {
    navigate("/");
  };

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
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            id="description"
            value={post.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="body">Body: </label>
          <textarea
            name="body"
            id="body"
            value={post.body}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            name="publish"
            id="publish"
            checked={post.published}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="checkbox">Publish</label>
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </>
  );
}
