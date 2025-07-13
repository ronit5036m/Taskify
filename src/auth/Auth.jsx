import { Navigate } from "react-router-dom";
// Protected Route Component
export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// Public Route Restriction (e.g., /login, /register)
export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
};

// export default {PrivateRoute , PublicRoute}
