import { Button } from '../../../ui-kit';
import './course-tab.scss';

const CourseTab = () => {
  return (
    <div className='course-tab'>
      <Button to='/course/new'>New Course</Button>
      <span>Add Course...</span>
      <div>Course List...</div>
    </div>
  );
};

export { CourseTab };
