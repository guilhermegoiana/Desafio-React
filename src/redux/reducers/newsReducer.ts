import { AnyAction } from 'redux';
import { INITIAL_STATE } from '../../types';
import { REQUEST_STARTED, REQUEST_SUCCESSFULL } from '../actions/newsActions';

const initialState = INITIAL_STATE;

const newsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return { ...state, loading: true };
    case REQUEST_SUCCESSFULL:
      return { ...state, news: action.payload, loading: false };
    default:
      return state;
  }
};

export default newsReducer;
