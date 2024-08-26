import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CourseInstanceForm() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [error, setError] = useState('');
  const [availableSemesters, setAvailableSemesters] = useState([]);

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    axios.get('http://localhost:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the courses!', error.response ? error.response.data : error.message);
      });

    // Set available semesters from 1 to 8
    setAvailableSemesters([...Array(8).keys()].map(i => i + 1));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (!selectedCourse || !year || !semester) {
      setError('All fields are required');
      return;
    }

    // Reset error state
    setError('');

    // Send data to the backend
    axios.post('http://localhost:8000/api/instances/', {
        course: selectedCourse,
        year: parseInt(year, 10),
        semester: parseInt(semester, 10)
      })
      .then(response => {
        console.log('Course instance created:', response.data);
        // Optionally clear form fields or provide feedback to the user
        setSelectedCourse('');
        setYear('');
        setSemester('');
      })
      .catch(error => {
        setError('There was an error creating the course instance!');
        console.error('Error response:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="form-container">
      <h2>Create Course Instance</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <select 
          value={selectedCourse} 
          onChange={e => setSelectedCourse(e.target.value)} 
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Year" 
          value={year} 
          onChange={e => setYear(e.target.value)} 
          required
        />
        <select 
          value={semester} 
          onChange={e => setSemester(e.target.value)} 
          required
        >
          <option value="">Select Semester</option>
          {availableSemesters.map(sem => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>
        <div className='button-container'>
          <button type="submit">Create Instance</button>
        </div>
      </form>
    </div>
  );
}

export default CourseInstanceForm;
