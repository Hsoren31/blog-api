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
  const [passwordFocused, setPasswordFocused] = useState(false);
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
              <li className="field-error">{err.msg}</li>
            ))}
          </ul>
        )}
        <legend>Sign Up</legend>
        <div className="form-row">
          <label htmlFor="name">Name (optional) </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        <div className="form-row">
          <label htmlFor="username">
            <span>*</span>Username: (8 - 15 characters)
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            required
            minLength={8}
            maxLength={15}
            placeholder="John_123"
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">
            <span>*</span>Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required
            minLength={8}
            maxLength={25}
            placeholder="Enter Password"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          {passwordFocused && (
            <ul>
              <li>8 - 25 characters</li>
              <li>One Uppercase Letter</li>
              <li>One Number</li>
            </ul>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="confirmPassword">
            <span>*</span>Confirm Password:{" "}
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleChange}
            required
            minLength={8}
            maxLength={25}
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        Have an account already? <Link to="/login">Login here.</Link>
      </p>
    </>
  );
}
