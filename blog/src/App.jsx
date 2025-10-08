import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Author from "./pages/Author";
import Post from "./pages/Post";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/:authorName">
        <Route index element={<Author />} />
        <Route path="/:postId" element={<Post />} />
      </Route>
    </Routes>
  );
}

export default App;
