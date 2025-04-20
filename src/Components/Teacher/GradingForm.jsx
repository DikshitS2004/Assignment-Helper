import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubmissionContext from '../../Contexts/SubmissionContext';
import AssignmentContext from '../../Contexts/AssignmentContext';
import { users } from '../../Data/Users';

const GradingForm = () => {
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submission, setSubmission] = useState(null);
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { submissions, gradeSubmission } = useContext(SubmissionContext);
  const { assignments } = useContext(AssignmentContext);
  
  useEffect(() => {
  
    const submissionData = submissions.find(s => s.id === id);
    
    if (submissionData) {
      setSubmission(submissionData);
      
     
      const assignment = assignments.find(a => a.id === submissionData.assignmentId);
      setAssignmentDetails(assignment);
      
   
      const student = users.find(u => u.id === submissionData.studentId);
      setStudentDetails(student);
 
      if (submissionData.status === 'graded') {
        setGrade(submissionData.grade);
        setFeedback(submissionData.feedback || '');
      }
    } else {
      setError('Submission not found');
    }
  }, [id, submissions, assignments]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    const gradeNum = parseInt(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      setError('Grade must be a number between 0 and 100');
      return;
    }
    
    try {
      gradeSubmission(id, gradeNum, feedback);
      navigate('/teacher/dashboard');
    } catch (err) {
      setError('Failed to save grade');
    }
  };
  
  if (error === 'Submission not found') {
    return <div className="error-container">{error}</div>;
  }
  
  if (!submission || !assignmentDetails || !studentDetails) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="grading-form">
      <h2 className='text-[5vw] lg:text-[1.5vw] text-gray-900'>Grade Submission</h2>
      {error && <div className="error">{error}</div>}
      
      <div className="submission-details">
        <h3 className='text-[3vw] lg:text-[0.8vw] tracking-tightier leading-none text-gray-800'>Assignment: {assignmentDetails.title}</h3>
        <p className='text-[3vw] lg:text-[0.8vw] '><strong>Student:</strong> {studentDetails.name}</p>
        <p className='text-[3vw] lg:text-[0.8vw] '><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
        <p className='text-[3vw] lg:text-[0.8vw] tracking-tightier leading-none mt-[2vw]'><strong>Student Comments:</strong> {submission.comments || 'No comments provided'}</p>
        
        <div className="file-preview">
          <h4 className='text-[3vw] lg:text-[0.8vw]'>Submitted File</h4>
          <p>
            <a className='text-[3vw] lg:text-[0.8vw] text-sky-900' href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
              View Submission
            </a>
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='text-[3vw] lg:text-[0.8vw]' htmlFor="grade">Grade (0-100)</label>
          <input
            type="number"
            className='text-[3vw] lg:text-[0.8vw]'
            id="grade"
            min="0"
            max="100"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label className='text-[3vw] lg:text-[0.8vw]' htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            className='text-[3vw] lg:text-[0.8vw]'
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/teacher/dashboard')} className="btn btn-secondary ">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary ">
            {submission.status === 'graded' ? 'Update Grade' : 'Submit Grade'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GradingForm;