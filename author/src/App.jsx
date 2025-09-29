import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeFeed from "./pages/HomeFeed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomeFeed />} />
          <Route path=":postId">
            <Route index element={<Post />} />
            <Route path="edit" element={<EditPost />} />
          </Route>
          <Route path="create" element={<CreatePost />} />
          <Route path="account">
            <Route index element={<Account />} />
            <Route path="edit" element={<EditAccount />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
