import React, { useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';
import AssignmentForm from '../Components/Teacher/AssignmentForm';
import SubmissionsList from '../Components/Teacher/SubmissionsList';
import GradingForm from '../Components/Teacher/GradingForm';

const TeacherDashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  
  return (
    <div className="dashboard">
      <header>
        <nav className='lg:w-full w-[100vw] h-[12vw] lg:h-[2vw] bg-[#530C22]'>
        <div className='flex flex-row lg:gap-[80vw] gap-[40vw]'>
          <span className=' lg:text-[1vw]  text-gray-100'>Welcome,<span className='font-bold text-gray-100'>{currentUser.name}</span> </span>
          <button className='text-left lg:text-[1vw]   ml-[1vw] text-gray-100' onClick={logout}>Logout</button>
        </div>
        </nav>
        <h1 className='lg:text-[1.5vw] text-[4vw] font-bold text-gray-900 '>Teacher Dashboard</h1>
       
      </header>
      
      <div className="dashboard-content">
        <nav className="sidebar">
          <ul className='flex flex-col gap-[5vw] lg:gap-[1vw]'>
            <li className='leading-none tracking-tightier '>
              <Link to="/teacher/dashboard" className='lg:text-[0.8vw] text-[2.5vw] font-bold'>All Submissions</Link>
            </li>
            <li className='leading-none tracking-tightier '>
              <Link to="/teacher/dashboard/assignments" className='lg:text-[0.8vw] text-[2.5vw] font-bold'>Manage Assignments</Link>
            </li>
          </ul>
        </nav>
        
        <main className="content">
          <Routes>
            <Route path="/" element={<SubmissionsList />} />
            <Route path="/assignments" element={<AssignmentForm />} />
            <Route path="/grade/:id" element={<GradingForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;