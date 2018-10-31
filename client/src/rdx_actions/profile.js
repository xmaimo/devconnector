import axios from 'axios';
import * as actionTypes from './actionTypes';

// Get All Profiles
export const getProfiles = () => {
  return (dispatch) => {
    dispatch(setProfileLoading());

    axios.get('/api/profile/all')
      .then((res) => {
        return dispatch({
          type: actionTypes.GET_PROFILES,
          payload: res.data
        })
      })
      .catch(err => dispatch({
        type: actionTypes.GET_PROFILES,
        payload: null
      }))
  }
}

// Get current Profile
export const getCurrentProfile = () => {
  return (dispatch) => {
    // here dispatch comes from redux-thunk
    dispatch(setProfileLoading());

    axios.get('/api/profile')
      .then(res => {
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

// Get Profile by handle
export const getProfileByHandle = (handle) => {
  return (dispatch) => {
    // here dispatch comes from redux-thunk
    dispatch(setProfileLoading());

    axios.get(`/api/profile/handle/${handle}`)
      .then(res => {
        return dispatch({
          type: actionTypes.GET_PROFILE,
          payload: res.data
        });
      })
      .catch(err => {
        return dispatch({
          type: actionTypes.GET_PROFILE,
          payload: null
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

// Add Experience
export const addExperience = (expData, history) => {
  return (dispatch) => {
    axios.post('/api/profile/experience', expData)
      .then((res) => history.push('/dashboard'))
      .catch(err => dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      }))
  }
}

// Delete Experience
export const deleteExperience = (id) => {
  return (dispatch) => {
    axios.delete(`/api/profile/experience/${id}`)
      .then((res) => {
        return dispatch({
          type: actionTypes.GET_PROFILE,
          payload: res.data
        })
      })
      .catch(err => dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      }))
  }
}

// Add Education
export const addEducation = (eduData, history) => {
  return (dispatch) => {
    axios.post('/api/profile/education', eduData)
      .then((res) => history.push('/dashboard'))
      .catch(err => dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      }))
  }
}

// Delete Education
export const deleteEducation = (id) => {
  return (dispatch) => {
    axios.delete(`/api/profile/education/${id}`)
      .then((res) => {
        return dispatch({
          type: actionTypes.GET_PROFILE,
          payload: res.data
        })
      })
      .catch(err => dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      }))
  }
}

// Delete account & profile
export const deleteAccount = () => {
  return (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      axios.delete('/api/profile')
        .then((res) => dispatch({
          type: actionTypes.SET_CURRENT_USER,
          payload: {}
        }))
        .catch(err => dispatch({
          type: actionTypes.GET_ERRORS,
          payload: err.response.data
        }))
    }
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