import produce from 'immer';

import { ActionType } from '../action-types';
import { Action, UserRole } from '../actions';

interface AuthState {
  token: string | null;
  userId: string | null;
  userRole: UserRole | null;
  error: string | null;
  isLoading: boolean;
  authRedirectPath: string;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  userRole: null,
  error: null,
  isLoading: false,
  authRedirectPath: '/',
};

const authStart = produce((state, action): AuthState | void => {
  state.error = null;
  state.isLoading = true;
  return state;
});

const authSuccess = produce((state, action): AuthState | void => {
  state.token = action.payload.idToken;
  state.userId = action.payload.userId;
  state.userRole = action.payload.userRole;
  state.error = null;
  state.isLoading = false;
  return state;
});

const authFail = produce((state, action): AuthState | void => {
  state.error = action.payload.error;
  state.isLoading = false;
  return state;
});

const authLogout = produce((state, action): AuthState | void => {
  state.token = null;
  state.userId = null;
  state.userRole = null;
  return state;
});

const setAuthRedirectPath = produce((state, action): AuthState | void => {
  state.authRedirectPath = action.payload.path;
  return state;
});

const reducer = (
  state: AuthState = initialState,
  action: Action
): AuthState | void => {
  switch (action.type) {
    case ActionType.AUTH_START:
      return authStart(state, action);
    case ActionType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case ActionType.AUTH_FAIL:
      return authFail(state, action);
    case ActionType.AUTH_LOGOUT:
      return authLogout(state, action);
    case ActionType.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export { reducer as authReducer };
