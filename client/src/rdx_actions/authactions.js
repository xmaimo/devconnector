import axios from 'axios';

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