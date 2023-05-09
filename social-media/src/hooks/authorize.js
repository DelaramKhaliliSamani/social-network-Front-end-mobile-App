import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

export const ProtectedRoute = ({  redirectPath = "/login", children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
