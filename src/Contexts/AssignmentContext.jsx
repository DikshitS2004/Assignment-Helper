import React, { createContext, useState, useEffect } from 'react';
import { assignments as sampleAssignments } from '../Data/Assignments';

export const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);
  
  useEffect(() => {
    // Load assignments from localStorage or use sample data
    const storedAssignments = localStorage.getItem('assignments');
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    } else {
      setAssignments(sampleAssignments);
      localStorage.setItem('assignments', JSON.stringify(sampleAssignments));
    }
  }, []);

  const createAssignment = (newAssignment) => {
    const assignmentWithId = {
      ...newAssignment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updatedAssignments = [...assignments, assignmentWithId];
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
    
    return assignmentWithId;
  };

  const updateAssignment = (id, updatedData) => {
    const updatedAssignments = assignments.map(assignment => 
      assignment.id === id ? { ...assignment, ...updatedData } : assignment
    );
    
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
  };

  const deleteAssignment = (id) => {
    const updatedAssignments = assignments.filter(assignment => assignment.id !== id);
    setAssignments(updatedAssignments);
    localStorage.setItem('assignments', JSON.stringify(updatedAssignments));
  };

  const value = {
    assignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
  };

  return (
    <AssignmentContext.Provider value={value}>
      {children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentContext;