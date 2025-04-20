import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (role && currentUser.role !== role) {
    // Redirect to appropriate dashboard if role doesn't match
    return <Navigate to={`/${currentUser.role}/dashboard`} />;
  }
  
  return children;
};

export default PrivateRoute;