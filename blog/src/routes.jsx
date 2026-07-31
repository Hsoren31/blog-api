import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Author from "./pages/Author";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Post from "./pages/Post/Post.jsx";
import ProtectedRoutes from "./ProtectedRoutes";
import Signup from "./pages/Auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <ProtectedRoutes />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/posts/:id",
            element: <Post />,
          },
          {
            path: "/:authorUsername",
            element: <Author />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
