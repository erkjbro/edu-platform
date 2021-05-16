import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Card } from '../../ui-kit';
import './edit-course.scss';

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
  // eslint-disable-next-line
  const [course, setCourse] = useState(initialFormState);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submitted!!!');

    console.log(course);

    // history.push('/');
  };

  return (
    <>
      {error && <div>Error...</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
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
                Create Course
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default EditCourse;
