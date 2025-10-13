import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
