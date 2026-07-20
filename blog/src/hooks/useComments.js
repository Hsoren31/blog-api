import { useState } from "react";
import { useFetch } from "./useFetch";
import { apiRequest } from "../api/client";

export function useComments(postId) {
  const { data, loading, error } = useFetch(`/posts/${postId}/comments`);

  return {
    comments: data,
    loading,
    error,
  };
}

export function useCreateComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createComment(postId, comment) {
    try {
      setLoading(true);
      setError(null);

      const data = await apiRequest(`/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
      });

      return data;
    } catch (err) {
      setError(err);
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { createComment, loading, error };
}

export function useEditComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function editComment(postId, commentId, comment) {
    try {
      setLoading(true);
      setError(null);

      const data = await apiRequest(`/posts/${postId}/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify(comment),
      });

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { editComment, loading, error };
}

export function useDeleteComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteComment(postId, commentId) {
    try {
      setLoading(true);
      setError(null);

      const data = await apiRequest(`/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
      });

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { deleteComment, loading, error };
}
