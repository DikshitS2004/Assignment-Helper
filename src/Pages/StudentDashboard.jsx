import React, { useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';
import AssignmentList from '../Components/Student/AssignmentList';
import SubmissionForm from '../Components/Student/SubmissionForm';
import GradesView from '../Components/Student/GradesView';

const StudentDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  
  return (
    <div className="dashboard">
      <header className='flex h-[12vw] lg:h-[3vw] w-full text-white items-center gap-[10vw] lg:gap-[55vw] bg-[#530C22]'>
        <h1 className='text-[5vw] lg:text-[1.3vw]'>Student Dashboard</h1>
        <div className='flex  items-center gap-[6vw] lg:gap-[5vw]'>
          <span className='text-[3.5vw] lg:text-[1.2vw]'>Welcome, {currentUser.name}</span>
          <button className='text-[3.5vw] lg:text-[1.2vw]' onClick={logout}>Logout</button>
        </div>
      </header>
      
      <div className="dashboard-content">
        <nav className="sidebar">
          <ul>
            <li > 
              <Link className='text-[3vw] lg:text-[0.9vw] font-bold' to="/student/dashboard">Assignments</Link>
            </li>
            <li>
              <Link className='text-[3vw] lg:text-[0.9vw] font-bold' to="/student/dashboard/grades">My Grades</Link>
            </li>
          </ul>
        </nav>
        
        <main className="content">
          <Routes>
            <Route path="/" element={<AssignmentList />} />
            <Route path="/submit/:id" element={<SubmissionForm />} />
            <Route path="/grades" element={<GradesView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;