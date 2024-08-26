import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CourseDetails from './components/CourseDetails'; // Import the new component
import CourseForm from './components/CourseForm';
import CourseInstanceForm from './components/CourseInstanceForm';
import CourseListSection from './components/CourseListSection';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Course Management</h1>
        </header>
        <div className="forms-container">
          <CourseForm />
          <CourseInstanceForm />
        </div>
        <Divider />
        <Routes>
          <Route path="/" element={<CourseListSection />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

const Divider = () => {
  return (
      <hr
          style={{ borderTop: "1px solid lightgrey" }}
      ></hr>
  );
};

export default App;

