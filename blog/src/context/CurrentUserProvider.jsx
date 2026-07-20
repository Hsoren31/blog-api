import { useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useNavigate } from "react-router-dom";

function useCurrentUser() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(user ? user : null);

  async function logout() {
    localStorage.clear();
    setCurrentUser(null);
    navigate("/");
  }

  return { currentUser, setCurrentUser, logout };
}

export function CurrentUserProvider({ children }) {
  const currentUser = useCurrentUser();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
}
