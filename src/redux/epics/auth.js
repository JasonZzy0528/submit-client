import { filter, map, mergeMap, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'
import {
  AUTHENTICATE,
  AUTHENTICATE_FULFILLED,
  AUTHENTICATE_REJECTED
} from '@/types'
import { authenticate } from '@/api'

const authenticateEpics = {
  authenticate: username => ({
    type: AUTHENTICATE,
    payload: username
  }),

  authenticateFulfilled: payload => ({
    type: AUTHENTICATE_FULFILLED,
    payload
  }),

  authenticateError: (error) => ({
    type: AUTHENTICATE_REJECTED,
    payload: error.message
  }),

  authenticateEpic: action$ => action$.pipe(
    ofType(AUTHENTICATE),
    filter(action => action.payload !== undefined),
    mergeMap(action => from(authenticate(action.payload)).pipe(
      map(response => authenticateEpics.authenticateFulfilled(response)),
      catchError(error => of(authenticateEpics.authenticateError(error)))
    ))
  )
}

export default authenticateEpics
