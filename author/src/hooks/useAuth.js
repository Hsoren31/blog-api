import { useState } from "react";
import { apiRequest } from "../api/client";
import { ApiError } from "../api/ApiError";

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
