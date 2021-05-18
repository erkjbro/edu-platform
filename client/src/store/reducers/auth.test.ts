import { authReducer } from './auth';
import { ActionType } from '../action-types';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(
      authReducer(undefined, {
        type: ActionType.SET_AUTH_REDIRECT_PATH,
        payload: { path: '/' },
      })
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      userRole: null,
      isLoading: false,
      authRedirectPath: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      authReducer(
        {
          token: null,
          userId: null,
          error: null,
          userRole: 'student',
          isLoading: false,
          authRedirectPath: '/',
        },
        {
          type: ActionType.AUTH_SUCCESS,
          payload: {
            idToken: 'some-token',
            userId: 'some-user-id',
            userRole: 'student',
          },
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      userRole: 'student',
      error: null,
      isLoading: false,
      authRedirectPath: '/',
    });
  });
});
