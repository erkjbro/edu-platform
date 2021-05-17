import { Dispatch } from 'redux';
import axios from 'axios';

import { ActionType } from '../action-types';
import {
  AuthStartAction,
  AuthSuccessAction,
  AuthFailAction,
  AuthLogoutAction,
  SetAuthRedirectPathAction,
  Action,
  UserRole,
} from '../actions';

export type AuthBody = {
  firstName?: string;
  lastName?: string;
  role?: UserRole | '';
  adminCode?: string;
  email: string;
  password: string;
};

type AuthResponse = {
  message: string;
  payload: {
    email: string;
    role: UserRole;
    token: string;
    userId: string;
  };
};

export const authStart = (): AuthStartAction => {
  return {
    type: ActionType.AUTH_START,
  };
};

export const authSuccess = (
  token: string,
  userId: string,
  userRole: UserRole
): AuthSuccessAction => {
  return {
    type: ActionType.AUTH_SUCCESS,
    payload: {
      idToken: token,
      userId: userId,
      userRole,
    },
  };
};

export const authFail = (error: string): AuthFailAction => {
  return {
    type: ActionType.AUTH_FAIL,
    payload: {
      error: error,
    },
  };
};

export const authLogout = (): AuthLogoutAction => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: ActionType.AUTH_LOGOUT,
  };
};

export const setAuthRedirectPath = (
  path: string
): SetAuthRedirectPathAction => {
  return {
    type: ActionType.SET_AUTH_REDIRECT_PATH,
    payload: {
      path: path,
    },
  };
};

export const checkAuthTimeout = (expirationTime: any) => {
  return (dispatch: Dispatch<Action>) => {
    setTimeout(() => {
      dispatch({
        type: ActionType.AUTH_LOGOUT,
      });
    }, expirationTime * 1000);
  };
};

export const auth = (body: AuthBody, isSignup: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.AUTH_START,
    });

    let authData = {
      email: body.email,
      password: body.password,
    } as AuthBody;

    let api_url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;

    if (isSignup) {
      authData = {
        ...authData,
        firstName: body.firstName,
        lastName: body.lastName,
        role: body.role,
      } as AuthBody;

      api_url = `${process.env.REACT_APP_BACKEND_URL}/auth/signup/${body.adminCode}`;
    }

    try {
      const { data }: { data: AuthResponse } = await axios.post(
        api_url,
        authData
      );

      const expirationDate = new Date(
        new Date().getTime() + 3 * 60 * 60 * 1000
      );

      localStorage.setItem('token', data.payload.token);
      localStorage.setItem('userId', data.payload.userId);
      localStorage.setItem('userRole', data.payload.role);
      localStorage.setItem('expirationDate', expirationDate.toISOString());

      dispatch({
        type: ActionType.AUTH_SUCCESS,
        payload: {
          idToken: data.payload.token,
          userId: data.payload.userId,
          userRole: data.payload.role,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.AUTH_FAIL,
        payload: {
          error: err.message,
        },
      });
    }
  };
};

export const authCheckState = () => {
  return (dispatch: Dispatch<Action>) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch({
        type: ActionType.AUTH_LOGOUT,
      });
    } else {
      const expirationDate = new Date(
        localStorage.getItem('expirationDate') as string
      );

      if (expirationDate <= new Date()) {
        dispatch({
          type: ActionType.AUTH_LOGOUT,
        });
      } else {
        const userId = localStorage.getItem('userId') as string;
        const userRole = localStorage.getItem('userRole') as UserRole;

        dispatch({
          type: ActionType.AUTH_SUCCESS,
          payload: {
            idToken: token,
            userId,
            userRole,
          },
        });

        dispatch({
          type: ActionType.CHECK_AUTH_TIMEOUT,
          payload: {
            expirationTime: ((expirationDate.getTime() - new Date().getTime()) /
              1000) as any,
          },
        });
      }
    }
  };
};
