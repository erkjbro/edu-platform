import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useTypedSelector as useSelector } from '../../../hooks/use-typed-selector';
import { Button, Card } from '../../ui-kit';
import './edit-course.scss';

const API_URL = process.env.REACT_APP_BACKEND_URL as string;

interface EditCourseState {
  title: {
    value: string;
  };
  description: {
    value: string;
  };
  skillLevel: {
    value: string;
  };
}

const initialFormState: EditCourseState = {
  title: {
    value: '',
  },
  description: {
    value: '',
  },
  skillLevel: {
    value: '',
  },
};

const EditCourse = ({ editMode }: { editMode: boolean }) => {
  const [course, setCourse] = useState(initialFormState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const history = useHistory();
  const { courseId }: { courseId: any } = useParams();

  useEffect(() => {
    if (editMode && courseId) {
      (async () => {
        const { data }: { data: any } = await axios.get(
          `${API_URL}/course/${courseId}`
        );

        if (data.payload) {
          setCourse({
            ...initialFormState,
            title: {
              value: data.payload.title,
            },
            description: {
              value: data.payload.description,
            },
            skillLevel: {
              value: data.payload.skillLevel,
            },
          });
        } else {
          setCourse({ ...initialFormState });
        }
      })();
    }
  }, [editMode, courseId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const courseData = {
      title: course.title.value,
      description: course.description.value,
      skillLevel: course.skillLevel.value,
    };

    let result: any;

    try {
      if (editMode && courseId) {
        result = await axios.patch(
          `${API_URL}/course/${courseId}`,
          courseData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        result = await axios.post(`${API_URL}/course`, courseData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      console.log(result.data.message);
      setIsLoading(false);
      history.push('/admin');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <>
      {error && (
        <h1 style={{ color: 'red' }} onClick={() => setError('')}>
          {error}
        </h1>
      )}
      {isLoading && <h1>Loading...</h1>}
      {!error && !isLoading && (
        <div className='edit__course'>
          {!editMode ? <h1>Create a Course!</h1> : <h1>Edit Course!</h1>}
          <Card className='edit__course--card'>
            <form className='edit__course--form' onSubmit={handleSubmit}>
              <label>
                Title
                <br />
                <input
                  type='text'
                  id='title'
                  placeholder='Title the course...'
                  value={course.title.value}
                  onChange={(event) =>
                    setCourse({
                      ...course,
                      title: {
                        value: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <label>
                Description
                <textarea
                  id='description'
                  placeholder='Describe the course...'
                  value={course.description.value}
                  onChange={(event) =>
                    setCourse({
                      ...course,
                      description: {
                        value: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <label>
                Skill Level &nbsp;
                <select
                  id='skillLevel'
                  value={course.skillLevel.value}
                  onChange={(event) =>
                    setCourse({
                      ...course,
                      skillLevel: {
                        value: event.target.value,
                      },
                    })
                  }
                >
                  <option value=''>---</option>
                  <option value='beginner'>Beginner</option>
                  <option value='intermediate'>Intermediate</option>
                  <option value='advanced'>Advanced</option>
                </select>
              </label>
              <Button
                disabled={
                  !course.description.value ||
                  !course.skillLevel.value ||
                  !course.title.value
                }
                className='form__button'
                type='submit'
              >
                {editMode ? 'Save Changes' : 'Create Course'}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default EditCourse;
