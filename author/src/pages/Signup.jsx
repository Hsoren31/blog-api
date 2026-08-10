import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import * as api from "../utils/apiFetches.js";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordInstructions, setPasswordInstructions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.postSignupRequest(formData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordInstructions = () => {
    setPasswordInstructions(!passwordInstructions);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <form onSubmit={submitUser} className="auth-form">
        <legend>Create an Account</legend>

        <>
          {error &&
            (Array.isArray(error) ? (
              error.map((err) => <p>{err.msg}</p>)
            ) : (
              <p>{error.msg}</p>
            ))}
        </>
        <p>
          Required fields are followed by <span aria-label="required">*</span>.
        </p>
        <div>
          <label htmlFor="name">Name (optional) </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">
            <span aria-label="required">*</span>Username: (8-15 characters)
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            minLength="8"
            maxLength="15"
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            <span aria-label="required">*</span>Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            maxLength="25"
            onFocus={togglePasswordInstructions}
            onBlur={togglePasswordInstructions}
          />
          {passwordInstructions && (
            <ul>
              <li>8-25 characters</li>
              <li>One Uppercase letter</li>
              <li>One Number</li>
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">
            <span aria-label="required">*</span>Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="8"
            maxLength="25"
          />
        </div>
        <button type="submit">Create Account</button>
        <p>
          Have an Account already? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
}
