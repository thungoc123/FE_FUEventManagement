import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  accountId: string,
  role: string,
  sub: number,
  exp: number
}


interface RequireAuthProps {
  children: JSX.Element;
  role: string;
}


const isTokenExpired = (token : string) => {
  let decoded = jwtDecode<JwtPayload>(token);
  let exp = decoded.exp
  let expirationDate = new Date(exp * 1000);
  let currentTime = Date.now();
  return currentTime > expirationDate.getTime()
};
export const roleName = (token : string) => {
  let decoded = jwtDecode<JwtPayload>(token);
  return decoded.role
  
};
export const accountID = (token : string) => {
  let decoded = jwtDecode<JwtPayload>(token);
  return decoded.accountId
};

const RequireAuth: React.FC<RequireAuthProps> = ({ children, role }) => {
  // const roleName = useSelector((state: RootState) => state.auth.role);
  // console.log(roleName)
  let token = sessionStorage.getItem('token') 
  // const token = localStorage.getItem('persist:auth') ? JSON.parse(localStorage.getItem('persist:auth')).token : null;
  // Check if the token is expired
  console.log(isTokenExpired(token))
  if (roleName(token) === role && !isTokenExpired(token)) {
    return children;
  } else{
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
