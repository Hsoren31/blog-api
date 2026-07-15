import { useFetch } from "./useFetch";

export function useAuthor(authorUsername) {
  const { data, loading, error } = useFetch(`/posts/author/${authorUsername}`);

  return {
    author: data?.author ?? {},
    loading,
    error,
  };
}
