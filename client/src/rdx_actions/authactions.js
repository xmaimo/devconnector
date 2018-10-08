import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken'
import * as actionTypes from './actionTypes';

// RegisterUser
export const registerUser = (userData) => {
  return (dispatch) => {
    axios.post('/api/users/register', userData)
      .then(res => console.log(res.data))
      .catch(err => {
        // here dispatch comes from redux-thunk
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        }
        )
      })
  }
}

// LoginUser
export const loginUser = (userData) => {
  return (dispatch) => {
    axios.post('/api/users/login', userData)
      .then(res => {
        console.log(res.data);
        // Save to localStorage
        const { token } = res.data;
        localStorage.setItem('jwt', token);

        // Set token to Auth Header
        setAuthToken(token);

        // Decode token to get user data
        const decoded = jwtDecode(token);

        // Set current user
        dispatch(setCurrentUser(decoded))
      })
      .catch(err => {
        // here dispatch comes from redux-thunk
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        }
        )
      })
  }
}

// log user out
export const logoutUser = () => {
  return dispatch => {
    // Remove token from localstorage
    localStorage.removeItem('jwt');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
  }
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded
  }
}