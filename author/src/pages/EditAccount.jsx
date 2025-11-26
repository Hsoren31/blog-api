import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";

export default function EditAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const initialUser = useRef(state.user);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(state.user);
  const submitDisable = initialUser.current === userData ? true : false;
  const changedData = {
    name:
      initialUser.current.name !== userData.name ? userData.name : undefined,
    username:
      initialUser.current.username !== userData.username
        ? userData.username
        : undefined,
  };

  function onCancel() {
    navigate("/account");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/3`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(changedData),
      });
      const results = await response.json();
      if (!response.ok || results.errors || results.error) {
        setError(results.errors || results.error);
        throw new Error(results.errors);
      }
      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (e) => {
    e.preventDefault();
    let result = confirm("Are you sure you want to delete your account?");
    if (!result) return;
    try {
      fetch(`http://localhost:3000/users/${localStorage.getItem("userId")}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
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
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={formChange}
          />
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit} disabled={submitDisable}>
          Submit
        </button>
      </form>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}
