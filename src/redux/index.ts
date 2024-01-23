import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import newsReducer from './reducers/newsReducer';

// const reducer = combineReducers({
//   newsReducer,
// });

const store = legacy_createStore(
  newsReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
