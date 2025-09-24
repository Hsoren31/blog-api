import { Link } from "react-router-dom";

export default function HomeFeed() {
  const posts = [
    {
      id: 1,
      title: "Fake Title 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: "Tue Sep 23 2025 09:09:04",
      published: false,
    },
    {
      id: 2,
      title: "Fake Title 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: "Wed Sep 23 2025 01:09:04",
      published: true,
    },
    {
      id: 3,
      title: "Fake Title 3",
      description:
        "Lorem et dolore magna aliqua. Ut enim ad minim veniam, ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: "Fri Mar 23 2025 12:09:04",
      published: true,
    },
    {
      id: 4,
      title: "Fake Title 4",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: "Mon Jul 2 2025 04:09:04",
      published: false,
    },
    {
      id: 5,
      title: "Fake Title 5",
      description:
        "Iscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timestamp: "Sun Feb 10 2025 03:09:04",
      published: true,
    },
  ];
  return (
    <>
      <h1>Welcome Back Username!</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>{post.timestamp}</p>
            <p>{post.published ? "Published" : "Unpublished"}</p>
            <Link to={"/" + post.id + "/edit"}>Edit</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
