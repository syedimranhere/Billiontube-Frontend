import { Navigate } from "react-router-dom";
import { UseUserContext } from "../context/AuthContext";
//so that unauth users cannot go to the protected routes
const ProtectedRoute = ({ children }) => {
  const { Authenticated, loading } = UseUserContext();
  if (loading) {
    return null
  }
  if (!Authenticated) return <Navigate to="/unauthorized404" />;
  return children;
};
export default ProtectedRoute;
