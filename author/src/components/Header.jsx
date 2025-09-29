import { Link } from "react-router-dom";

export default function Header() {
  function onLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
  }
  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <ul>
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
    </header>
  );
}
