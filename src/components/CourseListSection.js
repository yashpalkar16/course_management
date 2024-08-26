import axios from 'axios';
import React, { useState } from 'react';
import CourseInstanceTable from './CourseInstanceTable';
import CourseTable from './CourseTable';

function CourseListSection() {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [error, setError] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [semesters, setSemesters] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  // Fetch all courses
  const handleListCourses = () => {
    axios.get('http://localhost:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
        setShowTable(true);
        setError('');
      })
      .catch(error => {
        setError('There was an error listing the courses!');
        console.error('Error response:', error.response ? error.response.data : error.message);
      });
  };

  // Fetch instances based on year and semester
  const handleListInstances = () => {
    axios.get('http://localhost:8000/api/instances/', {
      params: { year, semester }
    })
      .then(response => {
        setInstances(response.data);
        setError('');
      })
      .catch(error => {
        setError('There was an error listing the instances!');
        console.error('Error response:', error.response ? error.response.data : error.message);
      });
  };

  // View course details in a new window
  const viewCourseDetails = (id) => {
    axios.get(`http://localhost:8000/api/courses/${id}/`)
      .then(response => {
        const course = response.data;
        const detailsWindow = window.open('', '_blank');
        detailsWindow.document.write(`
          <html>
            <head>
              <title>Course Details</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h2 { color: #4CAF50; }
              </style>
            </head>
            <body>
              <h2>Course Details</h2>
              <p><strong>Title:</strong> ${course.title}</p>
              <p><strong>Code:</strong> ${course.code}</p>
              <p><strong>Description:</strong> ${course.description}</p>
            </body>
          </html>
        `);
        detailsWindow.document.close();
      })
      .catch(error => {
        setError('There was an error fetching course details!');
        console.error('Error response:', error.response ? error.response.data : error.message);
      });
  };

  // Delete a course
  const deleteCourse = (id) => {
    axios.delete(`http://localhost:8000/api/courses/${id}/`)
      .then(() => {
        handleListCourses(); // Refresh course list after deletion
      })
      .catch(error => {
        setError('There was an error deleting the course!');
        console.error('Error response:', error.response ? error.response.data : error.message);
      });
  };

  // Handle delete course instance
  const handleDeleteInstance = (id) => {
    axios.delete(`http://localhost:8000/api/instances/${id}/`)
      .then(() => {
        handleListInstances(); // Refresh instance list after deletion
      })
      .catch(error => {
        setError('There was an error deleting the instance!');
        console.error('Error response:', error.response ? error.response.data : error.message);
      });
  };

  // Handle view course instance details
  const handleViewInstance = (id) => {
    axios.get(`http://localhost:8000/api/instances/${id}/`)
      .then(response => {
        const instance = response.data;
        const detailsWindow = window.open('', '_blank');
        detailsWindow.document.write(`
          <html>
            <head>
              <title>Instance Details</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h2 { color: #4CAF50; }
              </style>
            </head>
            <body>
              <h2>Instance Details</h2>
              <p><strong>Course Title:</strong> ${instance.course_title}</p>
              <p><strong>Course Description:</strong> ${instance.course_description}</p>
              <p><strong>Year-Semester:</strong> ${instance.year}-${instance.semester}</p>
              <p><strong>Course Code:</strong> ${instance.course_code}</p>
            </body>
          </html>
        `);
        detailsWindow.document.close();
      })
      .catch(error => {
        setError('There was an error fetching instance details!');
        console.error('Error response:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="course-list-section">
      <button onClick={handleListCourses}>List Courses</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showTable && (
        <CourseTable
          courses={courses}
          onViewDetails={viewCourseDetails} // Pass the view details function
          onDelete={deleteCourse}           // Pass the delete function
        />
      )}
      <Divider1 />
      <div className="filter-section">
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={e => setYear(e.target.value)}
          min="1900"
          max="2100"
          required
        />
        <select 
          value={semester}
          onChange={e => setSemester(e.target.value)}
          required
        >
          <option value="">Select Semester</option>
          {semesters.map(sem => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>
        <button onClick={handleListInstances}>List Instances</button>
        {instances.length > 0 && (
          <CourseInstanceTable 
            instances={instances} 
            onView={handleViewInstance} 
            onDelete={handleDeleteInstance} 
          />
        )}
      </div>
    </div>
  );
}

const Divider1 = () => {
  return (
      <hr
          style={{ borderTop: "1px solid lightgrey" }}
      ></hr>
  );
};

export default CourseListSection;

