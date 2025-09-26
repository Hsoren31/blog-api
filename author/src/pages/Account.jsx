import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${localStorage.getItem("userId")}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let userData = await response.json();
        setUser(userData.user);
        setError(null);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  function onEdit() {
    navigate("/account/edit");
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Account Details</h1>
      <p>Name: {user.firstName + " " + user.lastName}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={onEdit}>Edit</button>
    </>
  );
}
