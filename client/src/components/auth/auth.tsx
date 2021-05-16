import { useState, useEffect } from 'react';

import { useActions } from '../../hooks/use-actions';
// import { useTypedSelector as useSelector } from '../../hooks/use-typed-selector';
import { Card } from '../ui-kit';
import './auth.scss';

const initialFormState = {
  name: {
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

  const isLoading = false;

  const actions = useActions();

  useEffect(() => setForm({ ...initialFormState }), [isSignupMode]);

  const handleAuthSubmit = async (event: any) => {
    event.preventDefault();

    let body = {
      email: form.email.value,
      password: form.password.value,
      name: '',
    };

    if (isSignupMode) {
      body.name = form.name.value;
    }

    actions.auth(body.email, body.password, isSignupMode);
  };

  const handleAuthToggle = () => setIsSignupMode((prevState) => !prevState);

  return (
    <>
      {/* {error && <h1>Error</h1>} */}
      {/* {isLoading && <h1>Loading</h1>} */}
      {!isLoading && (
        <Card className='auth'>
          <h2>Authentication</h2>
          <div className='auth__card'>
            <form className='auth__card--form' onSubmit={handleAuthSubmit}>
              {isSignupMode && (
                <label>
                  Name
                  <input
                    id='name'
                    type='text'
                    placeholder='Name'
                    value={form.name.value}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: {
                          value: event.target.value,
                        },
                      })
                    }
                  />
                </label>
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
              <button type='submit' className='form__submit--btn'>
                {isSignupMode ? 'SIGNUP' : 'LOGIN'}
              </button>
            </form>
          </div>
          <button onClick={handleAuthToggle} className='auth__toggle--btn'>
            SWITCH TO {!isSignupMode ? 'SIGNUP' : 'LOGIN'}
          </button>
        </Card>
      )}
    </>
  );
};

export default Auth;
