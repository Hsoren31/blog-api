import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await login(user);
    navigate("/");
  }

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <legend>Login</legend>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/signup">Don't have an account? Sign up here.</Link>
    </>
  );
}
