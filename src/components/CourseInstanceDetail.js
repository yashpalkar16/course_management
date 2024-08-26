import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CourseInstanceDetail() {
  const { instanceId } = useParams();
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/instances/${instanceId}/`)
      .then(response => {
        setInstance(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the course instance details!', error);
      });
  }, [instanceId]);

  if (!instance) return <p>Loading...</p>;

  return (
    <div>
      <h1>{instance.course_title}</h1>
      <p><strong>Course Code:</strong> {instance.course_code}</p>
      <p><strong>Description:</strong> {instance.course_description}</p>
      <p><strong>Year:</strong> {instance.year}</p>
      <p><strong>Semester:</strong> {instance.semester}</p>
    </div>
  );
}

export default CourseInstanceDetail;
