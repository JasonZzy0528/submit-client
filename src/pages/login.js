import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from '@/components/root/login'
import configureStore from '@/redux/store'
import { Provider } from 'react-redux'

const initialState = Immutable.Map()
const store = configureStore(initialState)

const rootDOM = document.getElementById('root')

if (rootDOM) {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    rootDOM
  )
}
