import axios from 'axios';
import React, { useState } from 'react';

function CourseForm() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(' http://localhost:8000/api/courses/ ', { title, code, description })
      .then(response => {
        console.log('Course created:', response.data);
      })
      .catch(error => {
        console.error('There was an error creating the course!', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Course Code" value={code} onChange={e => setCode(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <div className="button-container">
          <button type="submit">Create Course</button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;
