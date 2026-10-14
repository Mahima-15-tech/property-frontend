// PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/portfolio" replace /> : children;
};

export default OpenRoute;
