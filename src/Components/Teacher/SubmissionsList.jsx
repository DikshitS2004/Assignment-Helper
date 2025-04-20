import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AssignmentContext from '../../Contexts/AssignmentContext';
import SubmissionContext from '../../Contexts/SubmissionContext';
import { users } from '../../Data/Users';

const SubmissionsList = () => {
  const { assignments } = useContext(AssignmentContext);
  const { submissions } = useContext(SubmissionContext);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [filter, setFilter] = useState('all'); 
 
  const enrichSubmissions = () => {
    return submissions.map(submission => {
      const assignment = assignments.find(a => a.id === submission.assignmentId);
      const student = users.find(u => u.id === submission.studentId);
      
      return {
        ...submission,
        assignmentTitle: assignment ? assignment.title : 'Unknown Assignment',
        studentName: student ? student.name : 'Unknown Student'
      };
    });
  };
  
  useEffect(() => {
    const enrichedSubmissions = enrichSubmissions();
    
    if (filter === 'all') {
      setFilteredSubmissions(enrichedSubmissions);
    } else if (filter === 'pending') {
      setFilteredSubmissions(enrichedSubmissions.filter(s => s.status === 'submitted'));
    } else if (filter === 'graded') {
      setFilteredSubmissions(enrichedSubmissions.filter(s => s.status === 'graded'));
    }
  }, [submissions, assignments, filter]);
  
  return (
    <div className="submissions-list">
      <h2 className='text-[3.5vw] lg:text-[1.5vw] text-center font-bold text-gray-700'>Student Submissions</h2>
      
      <div className="filters  flex flex-row gap-[3.5vw] lg:gap-[1.5vw] justify-center">
        <button 
          className={`text-[3.5vw] lg:text-[0.8vw] font-semibold text-gray-900 rounded-[0.4vw] other-classes-here ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`text-[3.5vw] lg:text-[0.8vw] font-semibold text-gray-900 rounded-[0.4vw] other-classes-here ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`text-[3.5vw] lg:text-[0.8vw] font-semibold text-gray-900 rounded-[0.4vw] other-classes-here ${filter === 'graded' ? 'active' : ''}`}
          onClick={() => setFilter('graded')}
        >
          Graded
        </button>
      </div>
      
      {filteredSubmissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="submissions-table">
          <thead>
            <tr className='leading-none tracking-tightier'>
              <th className='text-[3vw] lg:text-[1.4vw] text-gray-900'>Student</th>
              <th className='text-[3vw] lg:text-[1.4vw] text-gray-900'>Assignment</th>
              <th className='text-[3vw] lg:text-[1.4vw] text-gray-900'>Submitted Date</th>
              <th className='text-[3vw] lg:text-[1.4vw] text-gray-900'>Status</th>
              <th className='text-[3vw] lg:text-[1.4vw] text-gray-900'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map(submission => (
              <tr key={submission.id}>
                <td className='lg:text-[0.8vw] text-[3vw] font-semibold tracking-tightier  text-gray-700'>{submission.studentName}</td>
                <td className='lg:text-[0.8vw] text-[3vw] font-semibold tracking-tightier  text-gray-700'>{submission.assignmentTitle}</td>
                <td className='lg:text-[0.8vw] text-[3vw] font-semibold tracking-tightier  text-gray-700'>{new Date(submission.submittedAt).toLocaleDateString()}</td>
                <td>
                  <span className={`status ${submission.status} lg:text-[0.7vw] text-[3vw]`}>
                    {submission.status}
                  </span>
                </td>
                <td>
                  <Link 
                    to={`/teacher/dashboard/grade/${submission.id}`}
                    className="btn btn-small "
                  >
                    {submission.status === 'graded' ? 'View' : 'Grade'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubmissionsList;