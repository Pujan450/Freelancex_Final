import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import getCurrentUser from "./getCurrentUser";

const ProtectedRoute = ({ children }) => {
  const currentUser = getCurrentUser();
  const location = useLocation();

  if (!currentUser) {
    // Redirect to login and remember where the user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
