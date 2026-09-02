import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { loading, error, fieldErrors, login } = useLogin();

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  async function loginUser(e) {
    e.preventDefault();
    await login(userCredentials);
    navigate("/");
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      <form onSubmit={loginUser} className="auth-form">
        <legend>Login</legend>
        {error && <p className="error">{error}</p>}
        {Array.isArray(fieldErrors) && (
          <ul>
            {fieldErrors.map((err) => (
              <li className="field-error">{err.msg}</li>
            ))}
          </ul>
        )}
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={userCredentials.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={userCredentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </>
  );
}
