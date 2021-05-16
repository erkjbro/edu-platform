import { useState, useEffect } from 'react';

import { useActions } from '../../hooks/use-actions';
import { useTypedSelector as useSelector } from '../../hooks/use-typed-selector';
import { UserRole, AuthBody } from '../../store';
import { Button, Card } from '../ui-kit';
import './auth.scss';

interface AuthFormState {
  firstName: {
    value: string;
  };
  lastName: {
    value: string;
  };
  role: {
    value?: UserRole;
  };
  adminCode: {
    value: string;
  };
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

const initialFormState: AuthFormState = {
  firstName: {
    value: '',
  },
  lastName: {
    value: '',
  },
  role: {
    value: undefined,
  },
  adminCode: {
    value: '',
  },
  email: {
    value: '',
  },
  password: {
    value: '',
  },
};

const Auth = () => {
  const [form, setForm] = useState(initialFormState);
  const [isSignupMode, setIsSignupMode] = useState(false);
  const { isLoading, error } = useSelector((state) => state.auth);

  const actions = useActions();

  useEffect(() => setForm({ ...initialFormState }), [isSignupMode]);

  const handleAuthSubmit = async (event: any) => {
    event.preventDefault();

    let body = {
      email: form.email.value,
      password: form.password.value,
    } as AuthBody;

    if (isSignupMode) {
      body = {
        ...body,
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        role: form.role.value,
        adminCode: form.adminCode.value,
      };
    }

    actions.auth(body, isSignupMode);
  };

  const handleAuthToggle = () => setIsSignupMode((prevState) => !prevState);

  return (
    <>
      {error && <h1 style={{ color: 'red' }}>Error: {error}</h1>}
      {isLoading && <h1>Loading</h1>}
      {!isLoading && (
        <Card className='auth'>
          <h2>Authentication</h2>
          <div className='auth__card'>
            <form className='auth__card--form' onSubmit={handleAuthSubmit}>
              {isSignupMode && (
                <>
                  <label>
                    First Name
                    <input
                      id='firstName'
                      type='text'
                      placeholder='First Name'
                      value={form.firstName.value}
                      onChange={(event) =>
                        setForm({
                          ...form,
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
                      value={form.lastName.value}
                      onChange={(event) =>
                        setForm({
                          ...form,
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
                      value={form.role.value}
                      onChange={(event) => {
                        setForm({
                          ...form,
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
                  {form.role.value === 'admin' && (
                    <label>
                      Admin Code
                      <input
                        id='adminCode'
                        type='text'
                        placeholder='Enter "424242" as the code...'
                        value={form.adminCode.value}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            adminCode: {
                              value: event.target.value,
                            },
                          })
                        }
                      />
                    </label>
                  )}
                </>
              )}
              <label>
                E-Mail
                <input
                  id='email'
                  type='email'
                  placeholder='E-Mail'
                  value={form.email.value}
                  onChange={(event) =>
                    setForm({
                      ...form,
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
                  value={form.password.value}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      password: {
                        value: event.target.value,
                      },
                    })
                  }
                />
              </label>
              <Button disable type='submit' className='form__submit--btn'>
                {isSignupMode ? 'SIGNUP' : 'LOGIN'}
              </Button>
            </form>
          </div>
          <Button
            inverse
            onClick={handleAuthToggle}
            className='auth__toggle--btn'
          >
            SWITCH TO {!isSignupMode ? 'SIGNUP' : 'LOGIN'}
          </Button>
        </Card>
      )}
    </>
  );
};

export default Auth;
