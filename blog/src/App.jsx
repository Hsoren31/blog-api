import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Author from "./pages/Author";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { CurrentUserProvider } from "./context/CurrentUserProvider";

function App() {
  return (
    <CurrentUserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:authorName">
          <Route index element={<Author />} />
          <Route path=":postId" element={<Post />} />
        </Route>
      </Routes>
      <Footer />
    </CurrentUserProvider>
  );
}

export default App;
