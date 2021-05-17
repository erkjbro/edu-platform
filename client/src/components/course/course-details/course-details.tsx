import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { useTypedSelector as useSelector } from '../../../hooks/use-typed-selector';
import { Button } from '../../ui-kit';
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

  const { token, userRole } = useSelector((state) => state.auth);

  const history = useHistory();
  const { courseId }: { courseId: any } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: any } = await axios.get(
          `${API_URL}/course/${courseId}`
        );

        if (data.payload) {
          setCourse(data.payload);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [courseId]);

  const handleDeleteCourse = async () => {
    setIsLoading(true);
    try {
      const { data }: { data: any } = await axios.delete(
        `${API_URL}/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      console.log(data.message);
      history.push('/admin');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

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
          <h5>
            {course.skillLevel[0].toLocaleUpperCase() +
              course.skillLevel.slice(1)}
          </h5>
          <p>{course.description}</p>
          {token && userRole === 'admin' && (
            <span className='course__details--controls'>
              <Button
                className='controls__button'
                inverse
                to={`/course/edit/${courseId}`}
              >
                Edit Course
              </Button>
              <Button
                className='controls__button'
                danger
                onClick={handleDeleteCourse}
              >
                Delete Course
              </Button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
