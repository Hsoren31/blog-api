import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function EditAccount() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    emailChange: false,
    usernameChange: false,
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
        let userData = await response.json();
        setInitialData({
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
          username: userData.user.username,
          email: userData.user.email,
        });
        setUserData({
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
          username: userData.user.username,
          email: userData.user.email,
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
          body: JSON.stringify({ userData }),
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
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData.firstName}
            onChange={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                firstName: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userData.lastName}
            onChange={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                lastName: e.target.value,
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
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                email: e.target.value,
                emailChange:
                  e.target.value === initialData.email ? false : true,
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
