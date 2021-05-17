import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useTypedSelector as useSelector } from '../../../hooks/use-typed-selector';
import { UserRole } from '../../../store';
import { Button, Card } from '../../ui-kit';
import './edit-user.scss';

const API_URL = process.env.REACT_APP_BACKEND_URL as string;

interface UserFormState {
  firstName: {
    value: string;
  };
  lastName: {
    value: string;
  };
  role: {
    value?: UserRole;
  };
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

const initialFormState: UserFormState = {
  firstName: {
    value: '',
  },
  lastName: {
    value: '',
  },
  role: {
    value: undefined,
  },
  email: {
    value: '',
  },
  password: {
    value: '',
  },
};

const EditUser = () => {
  const [user, setUser] = useState(initialFormState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const userData = {
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      role: user.role.value,
      email: user.email.value,
      password: user.password.value,
    };

    try {
      const { data }: { data: any } = await axios.post(
        `${API_URL}/user/admin/create-user`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data.message);
      setIsLoading(false);
      history.push('/admin/users');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <>
      {error && (
        <h1 style={{ color: 'red' }} onClick={() => setError('')}>
          {error}
        </h1>
      )}
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && (
        <div className='edit__user'>
          <h1>Add a New User</h1>
          <Card className='edit__user--card'>
            <form className='edit__user--form' onSubmit={handleSubmit}>
              <label>
                First Name
                <input
                  id='firstName'
                  type='text'
                  placeholder='First Name'
                  value={user.firstName.value}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      firstName: {
                        value: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <label>
                Last Name
                <input
                  id='lastName'
                  type='text'
                  placeholder='Last Name'
                  value={user.lastName.value}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      lastName: {
                        value: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <label>
                User Type
                <select
                  id='userRole'
                  value={user.role.value}
                  onChange={(event) => {
                    setUser({
                      ...user,
                      role: {
                        value: event.target.value as UserRole,
                      },
                    });
                  }}
                >
                  <option value=''>---</option>
                  <option value='student'>Student</option>
                  <option value='admin'>Admin</option>
                </select>
              </label>
              <label>
                E-Mail
                <input
                  id='email'
                  type='email'
                  placeholder='E-Mail'
                  value={user.email.value}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      email: {
                        value: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <label>
                Password
                <input
                  id='password'
                  type='password'
                  placeholder='Password'
                  value={user.password.value}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      password: {
                        value: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <Button
                disabled={
                  !user.role.value ||
                  !user.firstName.value ||
                  !user.lastName.value ||
                  !user.email.value ||
                  !user.password.value
                }
                type='submit'
                className='form__button'
              >
                Create User
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default EditUser;
