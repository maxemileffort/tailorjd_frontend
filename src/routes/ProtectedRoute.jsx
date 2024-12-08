import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, role, requiredRoles, redirectPath = '/' }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!requiredRoles.includes(role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
