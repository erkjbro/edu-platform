import { ActionType } from '../action-types';

export interface AuthStartAction {
  type: ActionType.AUTH_START;
}

export interface AuthSuccessAction {
  type: ActionType.AUTH_SUCCESS;
  payload: {
    idToken: string;
    userId: string;
  };
}

export interface AuthFailAction {
  type: ActionType.AUTH_FAIL;
  payload: {
    error: string;
  };
}

export interface AuthLogoutAction {
  type: ActionType.AUTH_LOGOUT;
}

export interface SetAuthRedirectPathAction {
  type: ActionType.SET_AUTH_REDIRECT_PATH;
  payload: {
    path: string;
  };
}
