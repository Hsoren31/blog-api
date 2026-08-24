import { useUser } from "../../hooks/useUser";
import "./Home.css";
import { FilteredPostsSection } from "../../components/FilteredPostsSection";

export default function HomeFeed() {
  const username = JSON.parse(localStorage.getItem("user")).username;
  const { user, loading, error } = useUser(username);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Welcome Back {user.username}!</h1>
      <h2>Your Posts</h2>
      <FilteredPostsSection posts={user.posts} />
    </>
  );
}
