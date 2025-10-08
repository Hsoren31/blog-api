const posts = [
  {
    id: 1,
    title: "Test Title",
    description: "Short description of post",
    author: "Author 1",
    timestamp: "10/8/2025 10:00",
    commentCount: 31,
  },
  {
    id: 2,
    title: "Test Title 2",
    description: "Short description of post",
    author: "Author 2",
    timestamp: "10/8/2025 1:00",
    commentCount: 13,
  },
  {
    id: 3,
    title: "Test Title 3",
    description: "Short description of post",
    author: "Author 3",
    timestamp: "10/8/2025 5:34",
    commentCount: 6,
  },
];
export default function Home() {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <p>{post.title}</p>
          <p>{post.description}</p>
          <p>{post.author}</p>
          <p>{post.timestamp}</p>
          <p>{post.commentCount}</p>
        </li>
      ))}
    </ul>
  );
}
