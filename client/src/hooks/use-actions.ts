import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

import { actionCreators } from '../store';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
