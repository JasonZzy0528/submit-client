import { BehaviorSubject } from 'rxjs'
import { combineEpics } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'

const epicRegistry = []
export const epic$ = new BehaviorSubject(combineEpics(...epicRegistry))

const rootEpic = (action$, state$) =>
  epic$.pipe(
    mergeMap(epic => epic(action$, state$))
  )

export default rootEpic
