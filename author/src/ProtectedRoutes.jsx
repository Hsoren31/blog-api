import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let auth = localStorage.getItem("token");

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
