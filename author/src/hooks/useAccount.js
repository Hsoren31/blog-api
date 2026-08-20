import { useFetch } from "./useFetch";

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
