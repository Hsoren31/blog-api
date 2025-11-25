import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function EditAccount() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState({
    name: "",
    username: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    username: "",
  });

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
        let { user } = await response.json();
        setInitialData({
          name: user.name,
          username: user.username,
        });
        setUserData({
          name: user.name,
          username: user.username,
        });
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

  function onCancel() {
    navigate("/");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (JSON.stringify(initialData) == JSON.stringify(userData)) {
      setError("There are no changes to submit");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/users/${localStorage.getItem("userId")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/JSON",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: JSON.stringify(userData),
        }
      );
      const results = await response.json();
      if (!response.ok || results.error) {
        setError(results.error);
        throw new Error(results.error);
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

  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <h1>Edit Account</h1>
      <form>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                username: e.target.value,
                usernameChange:
                  e.target.value === initialData.username ? false : true,
              }));
            }}
          />
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}
