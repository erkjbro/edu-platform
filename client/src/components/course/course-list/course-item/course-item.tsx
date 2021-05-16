import { Link } from 'react-router-dom';

import { Card } from '../../../ui-kit';
import './course-item.scss';

const CourseItem = (props: any) => {
  const { _id, description, title, skillLevel } = props;

  return (
    <Card className='course__item'>
      <Link to={`/course/${_id}`}>
        <h2>{title}</h2>
        <h5>Level: {skillLevel[0].toUpperCase() + skillLevel.slice(1)}</h5>
        <p>{description}</p>
      </Link>
    </Card>
  );
};

export default CourseItem;
