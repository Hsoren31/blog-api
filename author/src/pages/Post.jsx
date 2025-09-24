import { Link } from "react-router";

export default function Post() {
  const post = {
    id: 3,
    title: "Fake Title 3",
    description:
      "Lorem et dolore magna aliqua. Ut enim ad minim veniam, ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    body: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \n Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. \n Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
    timestamp: "Fri Mar 23 2025 12:09:04",
    published: true,
    comments: [
      {
        id: 1,
        message:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem.",
        author: "Username3",
      },
      {
        id: 3,
        message: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        author: "userName4",
      },
    ],
  };
  return (
    <>
      <p>{post.published ? "Published" : "Unpublished"}</p>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.body}</p>
      <p>{post.timestamp}</p>
      {post.comments && (
        <ul>
          {post.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.message}</p>
              <p>{comment.author}</p>
            </div>
          ))}
        </ul>
      )}
      <Link to={"/" + post.id + "/edit"}>Edit</Link>
    </>
  );
}
