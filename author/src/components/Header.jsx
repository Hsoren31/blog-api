import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  CurrentUserContext,
  CurrentUserDispatchContext,
} from "../context/CurrentUserContext";

export default function Header() {
  const currentUser = useContext(CurrentUserContext);
  const currentUserDispatch = useContext(CurrentUserDispatchContext);

  function onLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    currentUserDispatch(null);
  }

  return (
    <header>
      <h1>Blog</h1>
      {currentUser ? (
        <nav>
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <a href="/login" onClick={onLogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
