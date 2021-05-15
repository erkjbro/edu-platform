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
// import RootState from '../reducers';

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
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email: string, password: string, isSignup: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;

    if (!isSignup) {
      url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
    }

    // userId
    // email
    // role
    // token

    // eslint-disable-next-line
    const { data }: { data: any } = await axios.post(url, authData);

    // axios
    //   .post(url, authData)
    //   .then((res) => {
    //     const expirationDate = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);

    //      // Check res data structure
    //     localStorage.setItem('token', res.data.idToken);
    //     localStorage.setItem('expirationDate', expirationDate);
    //     localStorage.setItem('userId', res.data.localId);

    //     dispatch(authSuccess(res.data.idToken, res.data.localId));
    //     dispatch(checkAuthTimeout(res.data.expiresIn));
    //   })
    //   .catch((err) => {
    //     dispatch(authFail(err.response.data.error));
    //   });
  };
};

// export const authCheckState = () => {
//   return (dispatch: Dispatch<Action>) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       dispatch(authLogout());
//     } else {
//       const expirationDate = new Date(localStorage.getItem('expirationDate'));
//       if (expirationDate <= new Date()) {
//         dispatch(authLogout());
//       } else {
//         const userId = localStorage.getItem('userId');
//         dispatch(authSuccess(token, userId));
//         dispatch(
//           checkAuthTimeout(
//             (expirationDate.getTime() - new Date().getTime()) / 1000
//           )
//         );
//       }
//     }
//   };
// };
