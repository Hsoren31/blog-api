import { useState, useEffect } from "react";
import { apiRequest } from "../api/client";

export function useFetch(path, options = {}) {
  const { method = "GET", body } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const result = await apiRequest(path, {
          method,
          body: body ? JSON.stringify(body) : undefined,
        });
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [path]);

  return { data, loading, error, setData };
}
