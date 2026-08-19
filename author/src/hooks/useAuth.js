import { useState, useContext } from "react";
import { apiRequest } from "../api/client";
import { ApiError } from "../api/ApiError";
import { AuthContext } from "../context/AuthContext";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState(null);

  async function signup(credentials) {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors(null);

      const response = await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      return response;
    } catch (err) {
      console.log(err);
      if (err instanceof ApiError) {
        setFieldErrors(err.fieldErrors);
      }
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, signup, fieldErrors };
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState(null);

  const { setUser } = useContext(AuthContext);

  async function login(credentials) {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors(null);

      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      localStorage.setItem("user", JSON.stringify(response.body));
      localStorage.setItem("token", response.token);
      setUser(response.body);
      return response;
    } catch (err) {
      console.log(err);
      if (err instanceof ApiError) {
        setFieldErrors(err.fieldErrors);
      }
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, fieldErrors, login };
}
