import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken'
import * as actionCreators from './rdx_actions/';

import authReducer from './rdx_reducers/authReducer';
import errorReducer from './rdx_reducers/errorReducer';
import profileReducer from './rdx_reducers/profileReducer';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, /* preloadedState, */
  composeEnhancers(applyMiddleware(thunk))
);

// Check for token
if (localStorage.jwt) {
  // Set auth token header auth
  setAuthToken(localStorage.jwt);
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwt);
  // Set User and isAuthenticated
  store.dispatch(actionCreators.setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout the user
    store.dispatch(actionCreators.logoutUser());
    // TODO: Clear current profile
    store.dispatch(actionCreators.clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
