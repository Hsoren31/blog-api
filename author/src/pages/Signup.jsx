import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, loading, error, fieldErrors } = useSignup();
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

  async function submitUser(e) {
    e.preventDefault();
    await signup(formData);
    navigate("/login");
  }

  const togglePasswordInstructions = () => {
    setPasswordInstructions(!passwordInstructions);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <form onSubmit={submitUser} className="auth-form">
        <legend>Create an Account</legend>
        {error && <p>{error}</p>}
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
          {fieldErrors.some((err) => err.path === "name") && (
            <span className="field-error">
              {fieldErrors.find((err) => err.path === "name").msg}
            </span>
          )}
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
          {fieldErrors.some((err) => err.path === "username") && (
            <span className="field-error">
              {fieldErrors.find((err) => err.path === "username").msg}
            </span>
          )}
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
          {fieldErrors.some((err) => err.path === "password") && (
            <span className="field-error">
              {fieldErrors.find((err) => err.path === "password").msg}
            </span>
          )}
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
          {fieldErrors.some((err) => err.path === "confirmPassword") && (
            <span className="field-error">
              {fieldErrors.find((err) => err.path === "confirmPassword").msg}
            </span>
          )}
        </div>
        <button type="submit">Create Account</button>
        <p>
          Have an Account already? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
}
