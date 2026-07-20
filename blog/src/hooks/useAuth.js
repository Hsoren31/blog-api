import { useState, useContext } from "react";
import { apiRequest } from "../api/client";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { ApiError } from "../api/ApiError";

export function useLogin() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  async function login(credentials) {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors(null);

      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.body));
      setCurrentUser(data.body);
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldErrors(error.fieldErrors);
      }
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { login, error, loading, fieldErrors };
}

export function useSignup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState(null);

  async function signup(userData) {
    try {
      setLoading(true);
      setError(null);
      setFieldErrors(null);

      const data = await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldErrors(error.fieldErrors);
      }
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { signup, error, loading, fieldErrors };
}
