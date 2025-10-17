import { useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { Navigate, useNavigate } from "react-router-dom";

function useCurrentUser() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(
    user ? JSON.parse(user) : null
  );

  async function register(credentials) {
    try {
      const response = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(data.message);
        }
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function login(userData) {
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(data.message);
        }
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function logout() {
    localStorage.clear();
    setCurrentUser(null);
    Navigate("/");
  }

  return { currentUser, setCurrentUser, register, login, logout };
}

export function CurrentUserProvider({ children }) {
  const currentUser = useCurrentUser();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
}
