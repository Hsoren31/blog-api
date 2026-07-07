import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <header>
      <h1>Blog</h1>
      {user ? (
        <nav>
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/write">Create</Link>
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
