import { API_BASE_URL } from "../config.js";
import { ApiError } from "./ApiError.js";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let body = null;
    try {
      body = await res.json();
    } catch {
      // response wasn't JSON — body stays null, fall back below
    }

    const message =
      body?.message ||
      body?.error ||
      `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, body?.errors ?? null);
  }

  return res.json();
}
