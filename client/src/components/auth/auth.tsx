import { useState, useEffect } from 'react';

import './Auth.scss';

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
  const [isLoginMode, setIsLoginMode] = useState(true);

  const isLoading = false;

  useEffect(() => setForm({ ...initialFormState }), [isLoginMode]);

  const handleAuthSubmit = async (event: any) => {
    event.preventDefault();

    let route = 'login';
    let body = {
      email: form.email.value,
      password: form.password.value,
      name: '',
    };

    if (!isLoginMode) {
      route = 'signup';
      body.name = form.name.value;
    }

    console.log(route);
  };

  const handleAuthToggle = () => setIsLoginMode((prevState) => !prevState);

  return (
    <>
      {/* {error && <h1>Error</h1>} */}
      {/* {isLoading && <h1>Loading</h1>} */}
      {!isLoading && (
        <div className='auth'>
          <h2>Authentication</h2>
          <div className='auth__card'>
            <form className='auth__card--form' onSubmit={handleAuthSubmit}>
              {!isLoginMode && (
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
                {!isLoginMode ? 'SIGNUP' : 'LOGIN'}
              </button>
            </form>
          </div>
          <button onClick={handleAuthToggle}>
            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
          </button>
        </div>
      )}
    </>
  );
};

export default Auth;
