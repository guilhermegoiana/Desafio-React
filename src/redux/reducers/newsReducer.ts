import { AnyAction } from 'redux';
import { INITIAL_STATE } from '../../types';
import { FILTER, REQUEST_STARTED, REQUEST_SUCCESSFULL } from '../actions/newsActions';

const initialState = INITIAL_STATE;

const newsReducer = (state = initialState, action: AnyAction) => {
  const getLocalStorage = localStorage.getItem('favoriteNews');
  switch (action.type) {
    case REQUEST_STARTED:
      return { ...state, loading: true };
    case REQUEST_SUCCESSFULL:
      return { ...state,
        news: {
          ...action.payload,
          filter: action.payload.items,
          favorites: getLocalStorage ? JSON.parse(getLocalStorage) : [] },
        loading: false };
    case 'FAVORITE':
      return { ...state,
        news: {
          ...state.news, favorites: action.payload } };
    case FILTER:
      return { ...state, news: { ...state.news, filter: action.payload } };
    default:
      return state;
  }
};

export default newsReducer;
