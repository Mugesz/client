import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  
  const isAuthenticated = localStorage.getItem('token');

  return (
   isAuthenticated ? (
    <Outlet/>
   ) :(
    
    <Navigate to={"/"}/>
   )
  );
};

export default PrivateRoute;
