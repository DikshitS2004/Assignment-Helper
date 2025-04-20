import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) return null;
  
  return (
    <nav className="sidebar">
      <div className="user-role">
        {currentUser.role === 'student' ? 'Student' : 'Teacher'} Dashboard
      </div>
      
      <ul className="nav-links">
        {currentUser.role === 'student' ? (
          <>
            <li>
              <NavLink to="/student/dashboard" end>Assignments</NavLink>
            </li>
            <li>
              <NavLink to="/student/dashboard/grades">My Grades</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/teacher/dashboard" end>Submissions</NavLink>
            </li>
            <li>
              <NavLink to="/teacher/dashboard/assignments">Manage Assignments</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;