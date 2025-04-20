import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">Assignment Portal</Link>
      </div>
      
      {currentUser && (
        <div className="user-menu">
          <span className="user-name">{currentUser.name}</span>
          <button onClick={logout} className="btn btn-logout">Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;