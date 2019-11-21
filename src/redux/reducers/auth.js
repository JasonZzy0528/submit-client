import { has } from 'lodash'
import Immutable from 'immutable'
import {
  AUTHENTICATE,
  AUTHENTICATE_FULFILLED,
  AUTHENTICATE_REJECTED,
  // LOGIN,
  // LOGIN_FULFILLED,
  // LOGIN_REJECTED
} from '@/types'

const initialState = new Immutable.Map({
  error: null,
  isAuthenticated: false,
  isVerifying: false
})

const genNewState = {
  // [LOGIN]: state => state.merge({ isVerifying: true }),
  // [LOGIN_FULFILLED]: state => state.merge({
  //   error: null,
  //   isAuthenticated: true,
  //   isVerifying: false
  // }),
  // [LOGIN_REJECTED]: (state, action) => state.merge({
  //   error: action.error,
  //   isAuthenticated: false,
  //   isVerifying: false
  // }),
  [AUTHENTICATE]: state => state.merge({ isVerifying: true }),
  [AUTHENTICATE_FULFILLED]: state => state.merge({
    error: null,
    isAuthenticated: true,
    isVerifying: false
  }),
  [AUTHENTICATE_REJECTED]: (state, action) => state.merge({
    error: action.error,
    isAuthenticated: false,
    isVerifying: false
  })
}
const authReducer = (state = initialState, action) => {
  if (has(genNewState, action.type)) {
    return genNewState(state, action)
  } else {
    return state
  }
}

export default authReducer
