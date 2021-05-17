import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import { Button } from '../../ui-kit';
import './course-details.scss';

type CourseObj = {
  _id: string;
  creator: any;
  title: string;
  description: string;
  skillLevel: string;
};

const API_URL = process.env.REACT_APP_BACKEND_URL as string;

const CourseDetails = () => {
  const [course, setCourse] = useState<CourseObj>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { courseId }: { courseId: any } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: any } = await axios.get(
          `${API_URL}/course/${courseId}`
        );

        if (data.payload) {
          setCourse(data.payload);
          console.log(data.payload);
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [courseId]);

  return (
    <div className='course__details'>
      {error && (
        <h1 style={{ color: 'red' }} onClick={() => setError('')}>
          {error}
        </h1>
      )}
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && course && (
        <div>
          <h1>{course.title}</h1>
          <h5>{course.skillLevel}</h5>
          <p>{course.description}</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
