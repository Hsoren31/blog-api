import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Author() {
  const { authorName } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/author/${authorName}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP Error: Status ${response.status}`);
        }
        let authorData = await response.json();
        setAuthor(authorData.author);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(author);
  return (
    <>
      {author && (
        <>
          <h1>{author.username}</h1>
          {author.posts && <p>{author.posts.length} Posts</p>}
          <ul>
            {author.posts ? (
              author.posts.map((post) => (
                <li key={post.id}>
                  <p>{post.title}</p>
                  <p>{post.description}</p>
                  <p>{post.author}</p>
                  <p>{post.timestamp}</p>
                  <p>{post.commentCount} Comments</p>
                </li>
              ))
            ) : (
              <p>No Posts.</p>
            )}
          </ul>
        </>
      )}
    </>
  );
}
