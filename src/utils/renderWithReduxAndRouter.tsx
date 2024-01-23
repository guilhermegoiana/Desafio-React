import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from '../redux/reducers/newsReducer.ts';
import { GlobalState } from '../types';

function renderWithRouterAndRedux(
  component: JSX.Element,
  route: string = '/',
  state: GlobalState | undefined = undefined,
  store = legacy_createStore(
    combineReducers({ counterReducer }),
    state,
    applyMiddleware(thunk),
  ),
) {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(
      <BrowserRouter>
        <Provider store={ store }>{component}</Provider>
      </BrowserRouter>,
    ),
    user: userEvent.setup(),
    store,
  };
}

export default renderWithRouterAndRedux;
