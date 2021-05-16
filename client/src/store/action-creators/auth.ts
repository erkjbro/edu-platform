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
} from '../actions';

type AuthResponse = {
  message: string;
  data: {
    email: string;
    role: 'student' | 'teacher' | 'admin';
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
  userId: string
): AuthSuccessAction => {
  return {
    type: ActionType.AUTH_SUCCESS,
    payload: {
      idToken: token,
      userId: userId,
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

export const auth = (email: string, password: string, isSignup: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.AUTH_START,
    });

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;

    if (isSignup) {
      url = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;
    }

    try {
      const { data }: { data: AuthResponse } = await axios.post(url, authData);

      const expirationDate = new Date(
        new Date().getTime() + 3 * 60 * 60 * 1000
      );

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('userId', data.data.userId);
      localStorage.setItem('expirationDate', expirationDate.toISOString());

      dispatch({
        type: ActionType.AUTH_SUCCESS,
        payload: {
          idToken: data.data.token,
          userId: data.data.userId,
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

        dispatch({
          type: ActionType.AUTH_SUCCESS,
          payload: {
            idToken: token,
            userId,
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
