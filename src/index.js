import * as serviceWorker from './serviceWorker'
import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from '@/components/root'
import configureStore, { history } from '@/redux/store'
import { Provider } from 'react-redux'

const initialState = Immutable.Map()
const store = configureStore(initialState)

const rootDOM = document.getElementById('root')

if (rootDOM) {
  ReactDOM.render(
    <Provider store={store}>
      <Root history={history} />
    </Provider>,
    rootDOM
  )
}

serviceWorker.register()
