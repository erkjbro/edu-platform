import { combineReducers } from 'redux';

import { authReducer } from './auth';

const reducers = combineReducers({
  authReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
