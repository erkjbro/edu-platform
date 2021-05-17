import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import { Button } from '../../ui-kit';
import './user-details.scss';

type UserObj = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

const API_URL = process.env.REACT_APP_BACKEND_URL as string;

const UserDetails = () => {
  const [user, setUser] = useState<UserObj>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { userId }: { userId: any } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: any } = await axios.get(
          `${API_URL}/user/${userId}`
        );

        if (data.payload) {
          setUser(data.payload);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  return (
    <div className='user__details'>
      {error && (
        <h1 style={{ color: 'red' }} onClick={() => setError('')}>
          {error}
        </h1>
      )}
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && user && (
        <div>
          <h1>
            {user.firstName[0].toUpperCase() + user.firstName.slice(1)}
            &nbsp;
            {user.lastName[0].toUpperCase() + user.lastName.slice(1)}
          </h1>
          <h5>E-Mail: {user.email}</h5>
          <h5>Role: {user.role[0].toUpperCase() + user.role.slice(1)}</h5>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
