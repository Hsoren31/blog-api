// All in one request to the backend.
const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      method: options.method || "GET",
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error("Response not ok");
  }

  const data = await res.json();

  return data;
}
