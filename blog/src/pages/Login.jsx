import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(data.message);
        }
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      localStorage.setItem("user", data.user);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={loginUser}>
      {error && <p>{error}</p>}
      <legend>Login</legend>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={(e) => {
            setUser((prevData) => ({
              ...prevData,
              username: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={(e) => {
            setUser((prevData) => ({
              ...prevData,
              password: e.target.value,
            }));
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
