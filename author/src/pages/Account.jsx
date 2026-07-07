import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAccountRequest } from "../utils/apiFetches";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getAccountRequest();
        setUser(user);
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
    navigate("/account/edit", {
      state: {
        user: {
          name: user.name,
          bio: user.bio,
        },
      },
    });
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Account Details</h1>
      <p>Name: {user.name}</p>
      <p>Bio: {user.bio}</p>
      <p>Username: {user.users.username}</p>
      <button onClick={onEdit}>Edit</button>
    </>
  );
}
