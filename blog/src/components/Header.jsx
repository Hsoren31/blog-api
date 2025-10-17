import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Header() {
  const { currentUser, logout } = useContext(CurrentUserContext);

  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {currentUser && (
            <li>
              <a href="/account">{currentUser.username}</a>
            </li>
          )}
          <li>
            {currentUser ? (
              <a href="/login" onClick={logout}>
                Logout
              </a>
            ) : (
              <a href="/login">Login</a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
