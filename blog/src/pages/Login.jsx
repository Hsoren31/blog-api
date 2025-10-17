import { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Login() {
  const { login } = useContext(CurrentUserContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await login(user);
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
