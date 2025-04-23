import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user && allowedRoles.includes(role) ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
