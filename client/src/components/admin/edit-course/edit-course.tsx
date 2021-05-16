import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Card } from '../../ui-kit';
import './edit-course.scss';

interface EditCourseState {
  title: string;
  description: string;
  skillLevel: string;
}

const initialFormState: EditCourseState = {
  title: '',
  description: '',
  skillLevel: '',
};

const EditCourse = ({ editMode }: { editMode: boolean }) => {
  // eslint-disable-next-line
  const [form, setForm] = useState(initialFormState);

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submitted!!!');
    history.push('/');
  };

  return (
    <div>
      {!editMode ? <h1>Create a Course!</h1> : <h1>Edit Course!</h1>}
      <Card>
        <form onSubmit={handleSubmit}>
          <h3>Form Elements here...</h3>
          <Button type='submit'>Create Course</Button>
        </form>
      </Card>
    </div>
  );
};

export default EditCourse;
