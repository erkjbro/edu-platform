import { CourseItem } from './course-item/course-item';
import './course-list.scss';

const CourseList = ({ courses }: { courses: any }) => {
  return (
    <ul className='course__list'>
      {courses.map((course: any) => (
        <li key={course._id}>
          <CourseItem {...course} />
        </li>
      ))}
    </ul>
  );
};

export { CourseList };
