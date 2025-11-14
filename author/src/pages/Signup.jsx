import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (!response.ok || data.error || data.errors) {
        setError(data.error || data.errors);
        throw new Error(`HTTP Status: ${response.status}`);
      }
      setFormData({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      setError(null);
      console.log("success");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      <form onSubmit={submitUser}>
        <legend>Create an Account</legend>
        <p>
          Have an Account already? <Link to="/login">Login</Link>
        </p>
        {error && (
          <>
            {error.map((err) => (
              <p>{err.msg}</p>
            ))}
          </>
        )}
        <p>
          Required fields are followed by <span aria-label="required">*</span>.
        </p>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="username">
            Username<span aria-label="required">*</span>:
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
            Password<span aria-label="required">*</span>:
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
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">
            Confirm Password<span aria-label="required">*</span>:
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
      </form>
    </>
  );
}
