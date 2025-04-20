import React, { createContext, useState, useEffect } from 'react';
import { users } from '../Data/Users';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    // Remove password before storing
    const { password: _, ...safeUser } = user;
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    setCurrentUser(safeUser);
    return safeUser;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    isTeacher: currentUser?.role === 'teacher',
    isStudent: currentUser?.role === 'student',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;