import { useFetch } from "./useFetch";

export function usePost(postId) {
  const { data, loading, error } = useFetch(`/posts/${postId}`);

  return {
    post: data?.post ?? {},
    loading,
    error,
  };
}

export function usePosts() {
  const { data, loading, error } = useFetch("/posts");

  return {
    posts: data?.posts ?? [],
    loading,
    error,
  };
}
