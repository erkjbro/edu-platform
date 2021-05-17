import { useState, useEffect } from 'react';
import axios from 'axios';

import UserList from '../../../user/user-list/user-list';
import { Button } from '../../../ui-kit';
import './user-tab.scss';

const API_URL = process.env.REACT_APP_BACKEND_URL as string;

const UserTab = () => {
  const [users, setUsers] = useState([]);
  // const [userRole, setUserRole] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: any } = await axios.get(`${API_URL}/user`);

        if (data.payload) {
          setUsers(data.payload);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className='user-tab'>
      <Button>New User</Button>
      {/* <label>
        User Role
        <select
          id='userRole'
          value={userRole}
          onChange={(event) => setUserRole(event.target.value)}
        >
          <option value=''>---</option>
          <option value='student'>Student</option>
          <option value='admin'>Admin</option>
        </select>
      </label> */}
      {error && <h1 onClick={() => setError('')}>{error}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && <UserList users={users} />}
    </div>
  );
};

export { UserTab };
