import axios from 'axios';
import * as actionTypes from './actionTypes';

// Get current Profile
export const getCurrentProfile = () => {
  return (dispatch) => {
    // here dispatch comes from redux-thunk
    dispatch(setProfileLoading());

    axios.post('/api/profile')
      .then(res => {
        console.log(res.data);

        return dispatch({
          type: actionTypes.GET_PROFILE,
          payload: res.data
        });
      })
      .catch(err => {
        return dispatch({
          type: actionTypes.GET_PROFILE,
          payload: {}
        }
        )
      })
  }
}

// Create Profile
export const createProfile = (profileData, history) => {
  return (dispatch) => {
    axios.post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err => {
        // here dispatch comes from redux-thunk
        return (
          dispatch({
            type: actionTypes.GET_ERRORS,
            payload: err.response.data
          })
        )
      })
  }
}

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: actionTypes.PROFILE_LOADING
  }
}

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  }
}