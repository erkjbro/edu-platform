import { useState, useEffect } from 'react';
import axios from 'axios';

import UserList from '../../../user/user-list/user-list';
import { Button } from '../../../ui-kit';
import './user-tab.scss';

const API_URL = process.env.REACT_APP_BACKEND_URL as string;

const UserTab = () => {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState('');
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

  useEffect(() => {
    (async () => {
      if (userRole) {
        try {
          setIsLoading(true);

          const { data }: { data: any } = await axios.get(
            `${API_URL}/user/role/${userRole}`
          );

          if (data.payload) {
            setUsers(data.payload);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [userRole]);

  const handleRoleChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserRole(event.target.value);
  };

  return (
    <div className='user-tab'>
      <Button to='/user/new'>New User</Button>
      <label style={{ marginTop: '1rem' }}>
        User Role &nbsp;
        <select
          id='userRole'
          disabled={isLoading}
          value={userRole}
          onChange={handleRoleChange}
        >
          <option value=''>---</option>
          <option value='student'>Student</option>
          <option value='admin'>Admin</option>
        </select>
      </label>
      {error && <h1 onClick={() => setError('')}>{error}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && <UserList users={users} />}
    </div>
  );
};

export { UserTab };
