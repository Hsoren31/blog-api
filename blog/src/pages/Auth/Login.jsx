import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

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
    <div id="login-container">
      <form onSubmit={handleSubmit}>
        {error && <p className="field-error">{error}</p>}
        <legend>Login</legend>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange}
            minLength="8"
            maxLength="15"
            placeholder="John_1234"
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
            minLength="8"
            maxLength="25"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up here.</Link>
      </p>
    </div>
  );
}
