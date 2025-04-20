import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AssignmentContext from '../../Contexts/AssignmentContext';
import SubmissionContext from '../../Contexts/SubmissionContext';
import AuthContext from '../../Contexts/AuthContext';

const AssignmentList = () => {
  const { assignments } = useContext(AssignmentContext);
  const { submissions } = useContext(SubmissionContext);
  const { currentUser } = useContext(AuthContext);
  
  // Check if student has submitted each assignment
  const hasSubmitted = (assignmentId) => {
    return submissions.some(
      submission => submission.assignmentId === assignmentId && 
                   submission.studentId === currentUser.id
    );
  };
  
  // Get submission status
  const getSubmissionStatus = (assignmentId) => {
    const submission = submissions.find(
      s => s.assignmentId === assignmentId && s.studentId === currentUser.id
    );
    
    return submission ? submission.status : null;
  };
  
  return (
    <div className="assignments-list">
      <h2 className='text-[5vw] lg:text-[1.8vw] font-semibold text-gray-900 ml-[5vw]'>Your Assignments</h2>
      
      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <ul className="assignment-cards">
          {assignments.map(assignment => {
            const submitted = hasSubmitted(assignment.id);
            const status = getSubmissionStatus(assignment.id);
            const isPastDue = new Date(assignment.dueDate) < new Date();
            
            return (
              <li key={assignment.id} className="assignment-card">
                <h3 className='lg:text-[1vw] leading-none font-bold text-gray-900'>{assignment.title}</h3>
                <p className='lg:text-[0.8vw] leading-none'>{assignment.description}</p>
                <p className='lg:text-[0.8vw]'>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                
                {status === 'graded' && (
                  <div className="status graded text-[3vw] lg:text-[1vw] mt-[1vw]">Graded</div>
                )}
                
                {status === 'submitted' && (
                  <div className="status submitted text-[3vw] lg:text-[1vw] ">Submitted</div>
                )}
                
                {!submitted && !isPastDue && (
                  <Link 
                    to={`/student/dashboard/submit/${assignment.id}`} 
                    className="btn btn-primary "
                  >
                    Submit Assignment
                  </Link>
                )}
                
                {!submitted && isPastDue && (
                  <div className="status overdue">Past Due</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AssignmentList;