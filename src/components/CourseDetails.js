import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CourseDetails() {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  // Extract course ID from the URL
  const courseId = window.location.pathname.split('/').pop();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/courses/${courseId}/`)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        setError('Error fetching course details');
        console.error('Error response:', error.response ? error.response.data : error.message);
      });
  }, [courseId]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {course ? (
        <div>
          <h2>Course Details</h2>
          <p><strong>Title:</strong> {course.title}</p>
          <p><strong>Code:</strong> {course.code}</p>
          <p><strong>Description:</strong> {course.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CourseDetails;
