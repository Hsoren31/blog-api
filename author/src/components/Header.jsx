import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  function toggleHamburger() {
    setHamburgerOpen(!hamburgerOpen);
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    toggleHamburger();
  }

  return (
    <header>
      <h1 id="app-name">
        <a href="/">Blog Author</a>
      </h1>
      <button
        onClick={toggleHamburger}
        id="hamburger"
        aria-expanded={hamburgerOpen ? "true" : "false"}
      ></button>
      {user ? (
        <nav id="user-nav">
          <ul className="nav" data-visible={hamburgerOpen ? "true" : "false"}>
            <li>
              <Link to="/account" onClick={toggleHamburger}>
                Account
              </Link>
            </li>
            <li>
              <Link to="/write" onClick={toggleHamburger}>
                Create
              </Link>
            </li>
            <li>
              <a href="/login" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="nav">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
