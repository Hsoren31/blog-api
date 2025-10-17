import { Link } from "react-router-dom";

export default function Header() {
  function logoutUser() {
    localStorage.clear();
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
            <a href="/login" onClick={logoutUser}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
