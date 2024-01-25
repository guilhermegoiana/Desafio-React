import { AnyAction } from 'redux';
import { INITIAL_STATE } from '../../types';
import { FILTER } from '../actions/newsActions';

const initialState = INITIAL_STATE;

const newsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default newsReducer;
