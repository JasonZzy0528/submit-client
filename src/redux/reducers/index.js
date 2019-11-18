import { BehaviorSubject, of } from 'rxjs'
import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { switchMap } from 'rxjs/operators'

let reducerRegistry = {}
const reducer$ = new BehaviorSubject()

export const reducerRegistry$ = reducer$.pipe(
  switchMap(reducer => {
    reducerRegistry = { ...reducerRegistry, ...reducer }
    return of(combineReducers(reducerRegistry))
  })
)

const createRootReducer = history => {
  const initialReducer = {
    router: connectRouter(history)
  }
  reducerRegistry$.next(initialReducer)
  return combineReducers(initialReducer)
}

export default createRootReducer