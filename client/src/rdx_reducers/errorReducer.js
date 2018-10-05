import * as actionTypes from '../rdx_actions/actionTypes';

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return action.payload
    default:
      return state
  }
}