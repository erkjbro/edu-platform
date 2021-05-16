import { Button } from '../../../ui-kit';
import './user-tab.scss';

const UserTab = () => {
  return (
    <div className='user-tab'>
      <Button>New User</Button>
      <div style={{ margin: '1rem 0' }}>
        <select>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='admin'>Admin</option>
        </select>
        <br />
        <br />
        <div>User List...</div>
      </div>
    </div>
  );
};

export { UserTab };
