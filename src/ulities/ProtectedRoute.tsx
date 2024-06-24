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
    const token = sessionStorage.getItem('token');
//   const token = useSelector((state: RootState) => state.auth.token);
//   const location = useLocation();
  let decodedToken: JwtPayload;

  try {
    decodedToken = jwtDecode<JwtPayload>(token || "");
  } catch (error) {
    console.error("Failed to decode token:", error);
    return <Navigate to="/login" />;
  }

  if (decodedToken.sub.length > 0 && decodedToken.sub === role) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
