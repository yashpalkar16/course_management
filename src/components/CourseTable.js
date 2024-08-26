import React from 'react';

function CourseTable({ courses, onViewDetails, onDelete }) {
  const handleViewDetails = (id) => {
    onViewDetails(id); // Ensure onViewDetails is correctly passed and used
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      onDelete(id); // Ensure onDelete is correctly passed and used
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Course Title</th>
          <th>Course Code</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <tr key={course.id}>
            <td>{course.title}</td>
            <td>{course.code}</td>
            <td>
              <button onClick={() => handleViewDetails(course.id)}>🔍</button>
              <button onClick={() => handleDelete(course.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseTable;




