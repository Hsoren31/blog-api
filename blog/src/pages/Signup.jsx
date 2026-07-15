import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useAuth";

export default function Signup() {
  const { signup, loading, error, fieldErrors } = useSignup();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(userData);
    navigate("/login");
  }

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {Array.isArray(fieldErrors) && (
          <ul>
            {fieldErrors.map((err) => (
              <li>{err.msg}</li>
            ))}
          </ul>
        )}
        <legend>Sign Up</legend>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" onChange={handleChange} />
          {fieldErrors?.name && (
            <p className="field-error">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/login">Have an account already? Login here.</Link>
    </>
  );
}
