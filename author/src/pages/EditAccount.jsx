import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { deleteAccountRequest, putAccountRequest } from "../utils/apiFetches";

export default function EditAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(state.user);

  function onCancel() {
    navigate("/account");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await putAccountRequest(userData);
      navigate("/account");
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    let result = confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!result) return;
    try {
      await deleteAccountRequest();
      localStorage.clear();
      navigate("/signup");
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  function formChange(e) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Edit Account</h1>
      <form>
        {error && (
          <>
            {error.map((err) => (
              <p>{err.msg}</p>
            ))}
          </>
        )}
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={formChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio: </label>
          <input
            type="text"
            name="bio"
            id="bio"
            value={userData.bio}
            onChange={formChange}
          />
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
      <h2>Delete Account</h2>
      <p>Permanently delete your account and all of your content.</p>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}
