import { apiRequest } from "../api/client";
import { useFetch } from "./useFetch";
import { useState } from "react";

export function useAccount() {
  const { data, loading, error } = useFetch(
    `/users/${JSON.parse(localStorage.getItem("user")).username}`
  );

  return {
    account: data?.user ?? {},
    loading,
    error,
  };
}

export function useEditAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function editAccount(accountData) {
    try {
      setLoading(true);
      setError(null);

      const response = apiRequest(
        `/users/${JSON.parse(localStorage.getItem("user")).username}`,
        {
          method: "PUT",
          body: JSON.stringify(accountData),
        }
      );

      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { editAccount, loading, error };
}

export function useDeleteAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteAccount(username) {
    try {
      setLoading(true);
      setError(null);

      const response = apiRequest(`/users/${username}`, {
        method: "DELETE",
      });

      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, deleteAccount };
}
