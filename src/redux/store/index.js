import createRootReducer, { reducerRegistry$ } from '@/redux/reducers'
import rootEpic from '@/redux/epics'
import { BehaviorSubject } from 'rxjs'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import { routerMiddleware } from 'connected-react-router/immutable'
import { switchMap } from 'rxjs/operators'

export const history = createBrowserHistory()
const reducer = createRootReducer(history)

export default preloadedState => {
  const logger = createLogger({
    level: 'info',
    collapsed: true
  })

  const reduxRouterMiddleware = routerMiddleware(history)
  const epicMiddleware = createEpicMiddleware()
  const epic$ = new BehaviorSubject(rootEpic)


  const hotReloadingEpic = (...args) =>
    epic$.pipe(switchMap(epic => epic(...args)))

  const middleware = [epicMiddleware, reduxRouterMiddleware, logger]

  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(...middleware),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )
  )

  epicMiddleware.run(hotReloadingEpic)
  reducerRegistry$.subscribe(nextReducer => {
    store.replaceReducer(nextReducer)
  })

  if (module.hot) {
    module.hot.accept('../epics', async () => {
      const module = await import('../epics')
      const nextRootEpic = module.default
      epic$.next(nextRootEpic)
    })
    module.hot.accept('../reducers', async () => {
      const module = await import('../reducers')
      const nextRootReducer = module.default(history)
      reducerRegistry$.next(nextRootReducer)
    })
  }

  return store
}
