import { ApiError } from "./ApiError";

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
    let body = null;
    try {
      body = await res.json();
    } catch {
      // response wasn't JSON - body stays null, fall back below
    }

    const message =
      body?.message ||
      body?.error ||
      `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, body?.errors ?? null);
  }

  const data = await res.json();

  return data;
}
