import { useFetch } from "./useFetch";

export function useUser(username) {
  const { data, loading, error } = useFetch(`/users/${username}`);

  return {
    user: data?.user ?? {},
    loading,
    error,
  };
}
