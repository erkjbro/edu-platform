import { useState, useEffect } from 'react';
import axios from 'axios';

import { CourseList } from '../course-list/course-list';
import { Button } from '../../ui-kit';
import './course-tab.scss';

const API_URL = process.env.REACT_APP_BACKEND_URL as string;

const CourseTab = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: any } = await axios.get(`${API_URL}/course`);

        if (data.payload) {
          setCourses(data.payload);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className='course-tab'>
      <Button to='/course/new'>New Course</Button>
      {error && <h1 onClick={() => setError('')}>{error}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && <CourseList courses={courses} />}
    </div>
  );
};

export default CourseTab;