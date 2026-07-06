import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { postLoginRequest } from "../utils/apiFetches";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await postLoginRequest(userCredentials);
      localStorage.setItem("user", JSON.stringify(response.body));
      localStorage.setItem("token", response.token);
      setUser(response.body);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={loginUser}>
        <legend>Login</legend>
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
