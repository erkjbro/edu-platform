import { useState, useEffect } from 'react';
import axios from 'axios';

import CourseList from '../../../course/course-list/course-list';
import { Button } from '../../../ui-kit';
import './course-tab.scss';

const URL = process.env.REACT_APP_BACKEND_URL as string;

const CourseTab = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: any } = await axios.get(`${URL}/course`);

        if (data.data) {
          setCourses(data.data);
        }
      } catch (err) {
        console.error(err.message);
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

export { CourseTab };
