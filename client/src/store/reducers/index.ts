import { combineReducers } from 'redux';

const emptyReducer = (state: any = {}, action: any): any => state;

const reducers = combineReducers({
  emptyReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
