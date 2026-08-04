import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import HomeFeed from "./pages/Home/HomeFeed.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Account from "./pages/Account.jsx";
import EditAccount from "./pages/EditAccount.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NotFoundPage from "./pages/NotFound.jsx";

export const router = createBrowserRouter([
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
            element: <HomeFeed />,
          },
          {
            path: "/write",
            element: <CreatePost />,
          },
          {
            path: "/:postId",
            children: [
              {
                index: true,
                element: <Post />,
              },
              {
                path: "edit",
                element: <EditPost />,
              },
            ],
          },
          {
            path: "/account",
            children: [
              {
                index: true,
                element: <Account />,
              },
              {
                path: "edit",
                element: <EditAccount />,
              },
            ],
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
