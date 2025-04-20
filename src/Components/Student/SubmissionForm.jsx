import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssignmentContext from '../../Contexts/AssignmentContext';
import SubmissionContext from '../../Contexts/SubmissionContext';

const SubmissionForm = () => {
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [assignment, setAssignment] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { assignments } = useContext(AssignmentContext);
  const { createSubmission } = useContext(SubmissionContext);
  
  useEffect(() => {
    const foundAssignment = assignments.find(a => a.id === id);
    if (foundAssignment) {
      setAssignment(foundAssignment);
    } else {
      setError('Assignment not found');
    }
  }, [assignments, id]);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please upload a file');
      return;
    }
    
    try {
      // In a real app, we would upload the file to storage
      // Here we'll just use the file name as a placeholder
      const fileUrl = URL.createObjectURL(file);
      
      createSubmission(id, fileUrl, comments);
      navigate('/student/dashboard');
    } catch (err) {
      setError('Failed to submit assignment');
    }
  };
  
  if (error === 'Assignment not found') {
    return <div className="error-container">{error}</div>;
  }
  
  if (!assignment) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="submission-form">
      <h2 className='lg:text-[1vw]'>Submit Assignment: {assignment.title}</h2>
      {error && <div className="error">{error}</div>}
      
      <div className="assignment-details">
        <p className='lg:text-[0.8vw]'><strong>Description:</strong> {assignment.description}</p>
        <p className='lg:text-[0.8vw]'><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className=' lg:text-[0.7vw]' htmlFor="file">Upload File</label>
          <input
            className='lg:text-[0.7vw]'
            type="file"
            id="file"
            onChange={handleFileChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label className='lg:text-[0.7vw]' htmlFor="comments">Comments (Optional)</label>
          <textarea
            className='lg:text-[0.7vw]'
            id="comments"
            rows="4"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/student/dashboard')} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;