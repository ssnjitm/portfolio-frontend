import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");       // simple check
  const { admin } = useAuthStore();                  // optional: check store too

  if (!token) {
    // not logged in → bounce to /admin/login
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}