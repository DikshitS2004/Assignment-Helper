import React, { useState, useContext, useEffect } from 'react';
import AssignmentContext from '../../Contexts/AssignmentContext';
import AuthContext from '../../Contexts/AuthContext';

const AssignmentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const { assignments, createAssignment, updateAssignment, deleteAssignment } = useContext(AssignmentContext);
  const { currentUser } = useContext(AuthContext);
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setIsEditing(false);
    setCurrentId(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing && currentId) {
      updateAssignment(currentId, { title, description, dueDate });
    } else {
      createAssignment({
        title,
        description,
        dueDate,
        createdBy: currentUser.id
      });
    }
    
    resetForm();
  };
  
  const handleEdit = (assignment) => {
    setTitle(assignment.title);
    setDescription(assignment.description);
    setDueDate(assignment.dueDate.split('T')[0]); // Format date for input
    setIsEditing(true);
    setCurrentId(assignment.id);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(id);
    }
  };
  
  return (
    <div className="assignment-management">
      <h2>{isEditing ? 'Edit Assignment' : 'Create New Assignment'}</h2>
      
      <form onSubmit={handleSubmit} className="assignment-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        
        <div className="form-actions">
          {isEditing && (
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Assignment' : 'Create Assignment'}
          </button>
        </div>
      </form>
      
      <h3>Existing Assignments</h3>
      {assignments.length === 0 ? (
        <p>No assignments created yet.</p>
      ) : (
        <ul className="assignments-list">
          {assignments.map(assignment => (
            <li key={assignment.id} className="assignment-item">
              <div className="assignment-info">
                <h4>{assignment.title}</h4>
                <p>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="assignment-actions">
                <button onClick={() => handleEdit(assignment)} className="btn btn-edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(assignment.id)} className="btn btn-delete">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentForm;