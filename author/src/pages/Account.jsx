import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { getAccountRequest } from "../utils/apiFetches";

export default function Account() {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getAccountRequest(currentUser.username);
        setUser(user);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser]);

  function onEdit() {
    navigate("/account/edit", {
      state: {
        user: {
          name: user.name,
          username: user.username,
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
      <ul>
        <li>{user._count.followedBy} followers</li>
        <li>{user._count.following} following</li>
      </ul>
      <button onClick={onEdit}>Edit</button>
    </>
  );
}
