// import { Dispatch } from 'redux';
// import axios from 'axios';

import { ActionType } from '../action-types';
import {
  AuthStartAction,
  AuthSuccessAction,
  AuthFailAction,
  AuthLogoutAction,
  SetAuthRedirectPathAction,
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

// export const checkAuthTimeout = (expirationTime) => {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime * 1000);
//   };
// };

// export const auth = (email, password, isSignup) => {
//   return (dispatch) => {
//     dispatch(authStart());

//     const authData = {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     };

//     let url = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;

//     if (!isSignup) {
//       url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
//     }

//     axios
//       .post(url, authData)
//       .then((res) => {
//         const expirationDate = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);

//          // Check res data structure
//         localStorage.setItem('token', res.data.idToken);
//         localStorage.setItem('expirationDate', expirationDate);
//         localStorage.setItem('userId', res.data.localId);

//         dispatch(authSuccess(res.data.idToken, res.data.localId));
//         dispatch(checkAuthTimeout(res.data.expiresIn));
//       })
//       .catch((err) => {
//         dispatch(authFail(err.response.data.error));
//       });
//   };
// };

// export const authCheckState = () => {
//   return (dispatch) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       dispatch(logout());
//     } else {
//       const expirationDate = new Date(localStorage.getItem('expirationDate'));
//       if (expirationDate <= new Date()) {
//         dispatch(logout());
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
