import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
    const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('token');

  return (
   isAuthenticated ? (
    <Outlet/>
   ) :(
    navigate("/")
   )
  );
};

export default PrivateRoute;
