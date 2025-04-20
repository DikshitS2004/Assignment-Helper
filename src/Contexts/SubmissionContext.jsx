import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { submissions as sampleSubmissions } from '../Data/Submissions';

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    // Load submissions from localStorage or use sample data
    const storedSubmissions = localStorage.getItem('submissions');
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    } else {
      setSubmissions(sampleSubmissions);
      localStorage.setItem('submissions', JSON.stringify(sampleSubmissions));
    }
  }, []);

  const createSubmission = (assignmentId, fileUrl, comments) => {
    const newSubmission = {
      id: Date.now().toString(),
      assignmentId,
      studentId: currentUser.id,
      fileUrl,
      comments,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    };
    
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    
    return newSubmission;
  };

  const gradeSubmission = (submissionId, grade, feedback) => {
    const updatedSubmissions = submissions.map(submission => 
      submission.id === submissionId 
        ? { ...submission, grade, feedback, status: 'graded' } 
        : submission
    );
    
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const getStudentSubmissions = (studentId) => {
    return submissions.filter(submission => submission.studentId === studentId);
  };

  const getSubmissionsByAssignment = (assignmentId) => {
    return submissions.filter(submission => submission.assignmentId === assignmentId);
  };

  const value = {
    submissions,
    createSubmission,
    gradeSubmission,
    getStudentSubmissions,
    getSubmissionsByAssignment
  };

  return (
    <SubmissionContext.Provider value={value}>
      {children}
    </SubmissionContext.Provider>
  );
};

export default SubmissionContext;