import { Link } from 'react-router-dom';

import { Card } from '../../../ui-kit';
import './user-item.scss';

const UserItem = (props: any) => {
  const { _id, firstName, lastName, role, email } = props;

  return (
    <Card className='user__item'>
      <Link to={`/user/${_id}`}>
        <h2>
          {firstName[0].toUpperCase() + firstName.slice(1)}
          &nbsp;
          {lastName[0].toUpperCase() + lastName.slice(1)}
        </h2>
        <h5>Role: {role[0].toUpperCase() + role.slice(1)}</h5>
        <h5>E-Mail: {email}</h5>
      </Link>
    </Card>
  );
};

export { UserItem };
