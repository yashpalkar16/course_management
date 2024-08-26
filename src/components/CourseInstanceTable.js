import React from 'react';

function CourseInstanceTable({ instances, onView, onDelete }) {
  const handleViewDetails = (id) => {
    // Ensure onView function is passed correctly and used
    if (onView) {
      onView(id);
    } else {
      console.error('onView function is not defined');
    }
  };

  const handleDelete = (id) => {
    // Ensure onDelete function is passed correctly and used
    if (onDelete) {
      if (window.confirm('Are you sure you want to delete this instance?')) {
        onDelete(id);
      }
    } else {
      console.error('onDelete function is not defined');
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Course Title</th>
          <th>Course Description</th>
          <th>Year-Semester</th>
          <th>Course Code</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {instances.map(instance => (
          <tr key={instance.id}>
            <td>{instance.course_title}</td>
            <td>{instance.course_description}</td>
            <td>{instance.year}-{instance.semester}</td>
            <td>{instance.course_code}</td>
            <td>
              <button onClick={() => handleViewDetails(instance.id)}>🔍</button>
              <button onClick={() => handleDelete(instance.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseInstanceTable;
