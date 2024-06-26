import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  sub: string;
  role?: string;
}

interface RequireAuthProps {
  children: JSX.Element;
  role: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, role }) => {
  const roleName = useSelector((state: RootState) => state.auth.role);

  if (roleName === role) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
