import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import { AssignmentProvider } from './Contexts/AssignmentContext';
import { SubmissionProvider } from './Contexts/SubmissionContext';
import Login from './Pages/Login';
import StudentDashboard from './Pages/StudentDashboard';
import TeacherDashboard from './Pages/TeacherDashboard';
import PrivateRoute from './Components/Auth/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router basename='/Assignment-Helper/'>
      <AuthProvider>
        <AssignmentProvider>
          <SubmissionProvider>
            <div className="app">
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/student/dashboard/*" 
                  element={
                    <PrivateRoute role="student">
                      <StudentDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/teacher/dashboard/*" 
                  element={
                    <PrivateRoute role="teacher">
                      <TeacherDashboard />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </div>
          </SubmissionProvider>
        </AssignmentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;