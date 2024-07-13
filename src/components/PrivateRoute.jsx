import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';


function PrivateRoute ({ children }){
  // const { token } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" />;
  };

export default PrivateRoute;
