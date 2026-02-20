import { Link } from "react-router-dom";

export default function Header() {
  const currentUser = localStorage.getItem("userId");

  function onLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
  }

  return (
    <header>
      <h1>Blog</h1>
      <p>{currentUser}</p>
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
              {currentUser ? "Logout" : "Login"}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
