import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Contexts/AuthContext';
import SubmissionContext from '../../Contexts/SubmissionContext';
import AssignmentContext from '../../Contexts/AssignmentContext';

const GradesView = () => {
  const { currentUser } = useContext(AuthContext);
  const { submissions } = useContext(SubmissionContext);
  const { assignments } = useContext(AssignmentContext);
  const [gradedSubmissions, setGradedSubmissions] = useState([]);
  
  useEffect(() => {
    // Filter submissions for the current student
    const studentSubmissions = submissions.filter(
      submission => submission.studentId === currentUser.id && submission.status === 'graded'
    );
    
    // Add assignment details to each submission
    const submissionsWithDetails = studentSubmissions.map(submission => {
      const assignment = assignments.find(a => a.id === submission.assignmentId);
      return {
        ...submission,
        assignmentTitle: assignment ? assignment.title : 'Unknown Assignment'
      };
    });
    
    setGradedSubmissions(submissionsWithDetails);
  }, [submissions, assignments, currentUser.id]);
  
  return (
    <div className="grades-view">
      <h2 className='lg:text-[1vw] lg:font-bold lg:text-gray-900 '>Your Grades</h2>
      
      {gradedSubmissions.length === 0 ? (
        <p className='lg:text-[0.8vw]'>No graded assignments yet.</p>
      ) : (
        <table className="grades-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Submitted Date</th>
              <th>Grade</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {gradedSubmissions.map(submission => (
              <tr key={submission.id}>
                <td>{submission.assignmentTitle}</td>
                <td>{new Date(submission.submittedAt).toLocaleDateString()}</td>
                <td className="grade">{submission.grade}/100</td>
                <td>{submission.feedback || 'No feedback provided'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GradesView;