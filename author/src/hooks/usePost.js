import { useState } from "react";
import { useFetch } from "./useFetch";
import { apiRequest } from "../api/client";

export function usePost(postId) {
  const { data, loading, error } = useFetch(`/posts/${postId}`);

  return {
    post: data?.post ?? {},
    loading,
    error,
  };
}

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createPost(postData) {
    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest("/posts", {
        method: "POST",
        body: JSON.stringify(postData),
      });

      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, createPost };
}

export function useEditPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function editPost(postId, postData) {
    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest(`/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(postData),
      });

      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, editPost };
}
