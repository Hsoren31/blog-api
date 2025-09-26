import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function EditAccount() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
        setFirstName(userData.user.firstName);
        setLastName(userData.user.lastName);
        setUsername(userData.user.username);
        setEmail(userData.user.email);
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
    try {
      const response = await fetch(
        `http://localhost:3000/users/${localStorage.getItem("userId")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/JSON",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
          }),
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
      <button onClick={onDelete}>Delete</button>
    </>
  );
}
