import { UserItem } from './user-item/user-item';
import './user-list.scss';

const UserList = ({ users }: { users: any }) => {
  return (
    <ul className='user__list'>
      {users.map((user: any) => (
        <li key={user._id}>
          <UserItem {...user} />
        </li>
      ))}
    </ul>
  );
};

export { UserList };
