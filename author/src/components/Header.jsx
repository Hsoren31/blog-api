import { Link } from "react-router-dom";

export default function Header() {
  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <header>
      <h1>Blog</h1>
      {localStorage.getItem("user") ? (
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
